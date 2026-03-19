"use client";

import { useEffect } from "react";
import { useMarketsStore } from "@/lib/stores/marketsStore"; 
import { MarketGrid } from "@/components/MarketTicker";
import { Button } from "ui";

export function TerminalDashboard() {
  const { markets, loading, error, fetchTopMarkets } = useMarketsStore();

  useEffect(() => {
    // Fetch markets on mount
    fetchTopMarkets();
    // Refetch every 30 seconds
    const interval = setInterval(fetchTopMarkets, 30000);
    return () => clearInterval(interval);
  }, [fetchTopMarkets]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 p-4 min-h-screen bg-polybloom-dark">
      {/* Header */}
      <div className="lg:col-span-4 mb-4">
        <div className="panel flex items-center justify-between">
          <div>
            <h1 className="neon-glow text-3xl">💹 PolyBloom Terminal</h1>
            <p className="text-slate-400 text-sm mt-1">Real-time crypto markets</p>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => fetchTopMarkets()}>
              🔄 Refresh
            </Button>
          </div>
        </div>
      </div>

      {/* Markets Panel - Left Sidebar */}
      <div className="lg:col-span-1">
        <div className="sticky top-4">
          <h2 className="text-lg font-semibold text-polybloom-neon mb-4">Top Markets</h2>
          {error ? (
            <div className="panel text-red-400 text-sm">{error}</div>
          ) : (
            <MarketGrid markets={markets} loading={loading} />
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="lg:col-span-3 space-y-4">
        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-4">
          <div className="panel text-center">
            <p className="text-slate-400 text-sm">Total Markets</p>
            <p className="neon-glow text-2xl">{markets.length}</p>
          </div>
          <div className="panel text-center">
            <p className="text-slate-400 text-sm">Market Cap</p>
            <p className="neon-glow text-2xl">$T</p>
          </div>
          <div className="panel text-center">
            <p className="text-slate-400 text-sm">24h Volume</p>
            <p className="neon-glow text-2xl">$B</p>
          </div>
        </div>

        {/* Placeholder for Charts */}
        <div className="panel min-h-96 flex items-center justify-center">
          <div className="text-center">
            <p className="neon-text text-lg">📊 Advanced Charts</p>
            <p className="text-slate-400 text-sm mt-2">
              TradingView Lightweight Charts integration coming soon
            </p>
          </div>
        </div>

        {/* Command Bar */}
        <div className="panel font-mono text-sm">
          <p className="text-slate-400">&gt; Type a command...</p>
          <input
            type="text"
            placeholder="add panel market-overview"
            className="w-full bg-transparent text-polybloom-neon outline-none mt-2"
          />
        </div>
      </div>
    </div>
  );
}
