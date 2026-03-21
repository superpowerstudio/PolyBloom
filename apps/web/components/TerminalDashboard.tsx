"use client";

import { useState, useCallback, useMemo } from "react";
import { useBotStore } from "@/lib/stores/botStore";
import { useLayoutStore } from "@/lib/stores/layoutStore";
import { useMarketsStore } from "@/lib/stores/marketsStore";
import { PanelGrid } from "@/components/PanelGrid";

export function TerminalDashboard() {
  const { paperMode, globalKillSwitch, toggleGlobalKillSwitch, bots, emergencyLiquidate } = useBotStore();
  const { addPanel } = useLayoutStore();
  const [commandInput, setCommandInput] = useState("");
  const [commandOutput, setCommandOutput] = useState<string[]>([]);

  const statusText = useMemo(() => {
    const mode = paperMode ? "Paper" : "Live";
    const killSwitch = globalKillSwitch ? " (KILL SWITCH ACTIVE)" : "";
    return `${mode} Trading Mode${killSwitch}`;
  }, [paperMode, globalKillSwitch]);

  const { fetchTopMarkets } = useMarketsStore();

  const executeCommand = useCallback((cmd: string) => {
    const parts = cmd.trim().toLowerCase().split(" ");
    const command = parts[0];
    const args = parts.slice(1);

    let output = "";

    switch (command) {
      case "help":
        output = `📚 Available commands:
  - help                 Show this help message
  - r / refresh          Refresh all data
  - clear                Clear command output
  - btc / eth / sol      Select that coin
  - polymarket           Scroll to Polymarket panel
  - bots / list bots     Scroll to Claw Control panel
  - kill                 Activate kill switch
  - backtest             Trigger new backtest
  - status               Show system status`;
        break;
      case "refresh":
      case "r":
        fetchTopMarkets();
        output = "🔄 Refreshing market data...";
        break;
      case "clear":
        setCommandOutput([]);
        return;
      case "btc":
      case "eth":
      case "sol":
      case "bnb":
      case "xrp":
        output = `📊 Selected ${command.toUpperCase()} — use Market Overview panel to view`;
        break;
      case "polymarket":
        output = "🎰 Scrolling to Polymarket panel...";
        break;
      case "bots":
      case "list":
        if (args[0] === "bots" || command === "bots") {
          output = "🤖 Scrolling to Claw Control panel...";
        } else {
          output = "❌ Usage: list bots";
        }
        break;
      case "kill":
        toggleGlobalKillSwitch();
        output = `🛑 Kill switch ${!globalKillSwitch ? "ACTIVATED" : "DEACTIVATED"}`;
        break;
      case "backtest":
        output = "⏮️ Triggering new backtest...";
        break;
      case "add":
        if (args[0] === "panel" && args[1]) {
          const panelType = args[1];
          const validTypes = ["markets", "portfolio", "order-book", "bot-control", "news", "backtester", "chart", "insight-chat", "replay", "studio-monitor", "polymarket", "polymarket-trading", "polymarket-portfolio"];
          if (validTypes.includes(panelType)) {
            const titleMap: Record<string, string> = {
              "markets": "Markets",
              "portfolio": "Portfolio",
              "order-book": "Order Book",
              "bot-control": "Bot Control",
              "news": "News Radar",
              "backtester": "Backtester",
              "chart": "Chart",
              "insight-chat": "Insight Chat",
              "replay": "Replay",
              "studio-monitor": "Studio Monitor",
              "polymarket": "Polymarket Order Book",
              "polymarket-trading": "Polymarket Trading",
              "polymarket-portfolio": "Polymarket Portfolio",
            };
            const title = titleMap[panelType] || panelType;
            addPanel(panelType as any, title);
            output = `✅ Added ${panelType} panel`;
          } else {
            output = `❌ Invalid panel type. Valid types: ${validTypes.join(", ")}`;
          }
        } else {
          output = "❌ Usage: add panel <type>";
        }
        break;

      case "list":
        if (args[0] === "bots") {
          if (bots.length === 0) {
            output = "📋 No bots configured";
          } else {
            output = `📋 Bots:\n${bots.map(b => `  - ${b.name} (${b.strategy}) [${b.status}]`).join("\n")}`;
          }
        } else {
          output = "❌ Usage: list bots";
        }
        break;

      case "toggle":
        if (args[0] === "kill" && args[1] === "switch") {
          toggleGlobalKillSwitch();
          output = `🔄 Kill switch toggled: ${!globalKillSwitch ? "ACTIVE" : "INACTIVE"}`;
        } else {
          output = "❌ Usage: toggle kill switch";
        }
        break;

      case "emergency":
        if (args[0] === "liquidate") {
          emergencyLiquidate();
          output = "🚨 Emergency liquidation executed - All positions closed";
        } else {
          output = "❌ Usage: emergency liquidate";
        }
        break;

      case "status":
        const runningBots = bots.filter(b => b.status === "running").length;
        const totalPnl = bots.reduce((sum, b) => sum + b.pnl, 0);
        output = `📊 System Status:
  - Mode: ${paperMode ? "Paper" : "Live"} Trading
  - Kill Switch: ${globalKillSwitch ? "ACTIVE ❌" : "INACTIVE ✅"}
  - Running Bots: ${runningBots}/${bots.length}
  - Total PnL: $${totalPnl.toFixed(2)}`;
        break;

      default:
        output = `❌ Unknown command: ${command}. Type 'help' for available commands.`;
    }

    setCommandOutput(prev => [...prev, `> ${cmd}`, output]);
  }, [bots, globalKillSwitch, paperMode, toggleGlobalKillSwitch, emergencyLiquidate, addPanel, fetchTopMarkets]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && commandInput.trim()) {
      executeCommand(commandInput);
      setCommandInput("");
    }
  };

  const buttonStyle = {
    fontFamily: 'Space Grotesk, monospace',
    fontSize: '0.625rem',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.1em',
    padding: '0.5rem 0.75rem',
    borderRadius: '0.125rem',
    transition: 'all 0.2s',
  };

  return (
    <div className="min-h-screen p-4 space-y-4" style={{ backgroundColor: '#0A1019' }}>
      {/* Header */}
      <div className="p-4" style={{ backgroundColor: '#111823', borderBottom: '1px solid #1C2431' }}>
        <div className="flex items-center justify-between">
          <div>
            <a 
              href="/" 
              style={{ 
                fontFamily: 'Space Grotesk, monospace',
                fontSize: '0.75rem',
                color: '#807665',
                display: 'inline-block',
                marginBottom: '0.5rem',
              }}
            >
              ← Home
            </a>
            <h1 
              style={{ 
                fontFamily: 'Newsreader, serif',
                fontStyle: 'italic',
                fontSize: '2rem',
                color: '#C49A3C',
                fontWeight: 400,
              }}
            >
              PolyBloom Terminal
            </h1>
            <p 
              style={{ 
                fontFamily: 'Work Sans, sans-serif',
                fontSize: '0.875rem',
                color: '#D2C5B1',
                marginTop: '0.25rem',
              }}
            >
              Bloomberg-style crypto trading + AI
            </p>
          </div>
          <div className="flex gap-2">
            <button
              style={{
                ...buttonStyle,
                backgroundColor: 'transparent',
                color: '#F9F9FF',
                border: '1px solid #1C2431',
              }}
              type="button"
              onClick={() => window.location.reload()}
            >
              🔄 Refresh
            </button>
            <button
              style={{
                ...buttonStyle,
                backgroundColor: 'transparent',
                color: '#F9F9FF',
                border: '1px solid #1C2431',
              }}
              type="button"
              onClick={() => executeCommand("status")}
            >
              ⚙️ Status
            </button>
            <button
              style={{
                ...buttonStyle,
                backgroundColor: globalKillSwitch ? '#ae3032' : 'transparent',
                color: globalKillSwitch ? '#F9F9FF' : '#ae3032',
                border: `1px solid ${globalKillSwitch ? '#ae3032' : '#1C2431'}`,
              }}
              type="button"
              onClick={() => executeCommand("kill")}
            >
              🛑 Kill Switch
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <PanelGrid />

      {/* Bottom - Command Bar */}
      <div className="p-4" style={{ backgroundColor: '#111823', borderTop: '1px solid #1C2431' }}>
        <p 
          style={{ 
            fontFamily: 'Space Grotesk, monospace',
            fontSize: '0.625rem',
            color: '#C49A3C',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: '0.5rem',
          }}
        >
          💬 Command Bar
        </p>
        
        {/* Command Output */}
        {commandOutput.length > 0 && (
          <div 
            className="p-3 mb-3 max-h-40 overflow-y-auto"
            style={{ backgroundColor: '#0D141F', borderRadius: '0.125rem' }}
          >
            {commandOutput.map((line, i) => (
              <div 
                key={i} 
                style={{ 
                  fontFamily: 'Space Grotesk, monospace',
                  fontSize: '0.75rem',
                  color: line.startsWith(">") ? "#C49A3C" : "#D2C5B1",
                  whiteSpace: 'pre-wrap',
                }}
              >
                {line}
              </div>
            ))}
          </div>
        )}
        
        {/* Command Input */}
        <input
          type="text"
          value={commandInput}
          onChange={(e) => setCommandInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="> Type a command (e.g., 'add panel markets', 'list bots', 'help')"
          className="w-full outline-none px-2 py-1"
          style={{
            fontFamily: 'Space Grotesk, monospace',
            fontSize: '0.75rem',
            backgroundColor: 'transparent',
            color: '#F9F9FF',
            borderRadius: '0.125rem',
          }}
        />
      </div>

      {/* Footer */}
      <div className="text-center py-4" style={{ borderTop: '1px solid #1C2431' }}>
        <p
          style={{
            fontFamily: 'Space Grotesk, monospace',
            fontSize: '0.625rem',
            color: '#4E4637',
          }}
        >
          PolyBloom Terminal v0.2 | {statusText} | The Bespoke Ledger
        </p>
      </div>
    </div>
  );
}