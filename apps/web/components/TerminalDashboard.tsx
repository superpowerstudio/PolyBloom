"use client";

import { useMemo } from "react";
import { useBotStore } from "@/lib/stores/botStore";
import { PanelGrid } from "@/components/PanelGrid";
import { Button } from "ui";

export function TerminalDashboard() {
  const { paperMode, globalKillSwitch } = useBotStore();

  const statusText = useMemo(() => {
    const mode = paperMode ? "Paper" : "Live";
    const killSwitch = globalKillSwitch ? " (KILL SWITCH ACTIVE)" : "";
    return `${mode} Trading Mode${killSwitch}`;
  }, [paperMode, globalKillSwitch]);

  return (
    <div className="min-h-screen bg-polybloom-dark p-4 space-y-4">
      {/* Header */}
      <div className="panel border-b-2 border-polybloom-neon">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="neon-glow text-4xl">💹 PolyBloom Terminal</h1>
            <p className="text-slate-400 text-sm mt-1">
              Bloomberg-style crypto trading + AI
            </p>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline">
              🔄 Refresh
            </Button>
            <Button size="sm" variant="ghost">
              ⚙️ Settings
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <PanelGrid />

      {/* Bottom - Command Bar */}
      <div className="panel font-mono text-sm border-t border-polybloom-neon">
        <p className="text-polybloom-neon mb-2">💬 Command Bar</p>
        <input
          type="text"
          placeholder="> Type a command (e.g., 'add panel market-overview', 'list bots', 'start backtest')"
          className="w-full bg-transparent text-white outline-none focus:ring-2 focus:ring-polybloom-neon px-2 py-1 rounded"
        />
      </div>

      {/* Footer */}
      <div className="text-center text-slate-600 text-xs py-4">
        <p>
          PolyBloom Terminal v0.2 | {statusText} | Built with
          Next.js+React+Tailwind
        </p>
      </div>
    </div>
  );
}
