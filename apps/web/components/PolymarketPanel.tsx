"use client";

import { useEffect } from "react";
import { usePolymarketStore } from "@/lib/stores/polymarketStore";

export function PolymarketPanel() {
  const { markets, loading, error, fetchMarkets } = usePolymarketStore();

  useEffect(() => {
    fetchMarkets(20);
  }, [fetchMarkets]);

  const formatPrice = (price: number | undefined) => {
    if (price === undefined) return "N/A";
    return `${(price * 100).toFixed(1)}%`;
  };

  const formatVolume = (volume: number | undefined) => {
    if (volume === undefined) return "N/A";
    if (volume >= 1000000) return `$${(volume / 1000000).toFixed(1)}M`;
    if (volume >= 1000) return `$${(volume / 1000).toFixed(1)}K`;
    return `$${volume.toFixed(0)}`;
  };

  const getPriceColor = (price: number | undefined) => {
    if (price === undefined) return "text-slate-400";
    if (price >= 0.6) return "text-green-400";
    if (price <= 0.4) return "text-red-400";
    return "text-yellow-400";
  };

  if (loading) {
    return (
      <div className="space-y-3">
        <div className="panel flex items-center justify-between">
          <h2 className="neon-glow text-xl">🔮 Polymarket</h2>
        </div>
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="panel animate-pulse">
              <div className="h-4 bg-slate-700 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-slate-700 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-3">
        <div className="panel flex items-center justify-between">
          <h2 className="neon-glow text-xl">🔮 Polymarket</h2>
        </div>
        <div className="panel bg-red-900/20 border border-red-700">
          <p className="text-red-400 text-sm mb-2">Error: {error}</p>
          <button
            onClick={() => fetchMarkets(20)}
            className="text-xs bg-red-700 hover:bg-red-600 text-white px-3 py-1 rounded"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="panel flex items-center justify-between">
        <h2 className="neon-glow text-xl">🔮 Polymarket</h2>
        <span className="text-xs text-slate-400">{markets.length} markets</span>
      </div>

      <div className="space-y-2 max-h-[400px] overflow-y-auto">
        {markets.map((market) => (
          <div
            key={market.id}
            className="panel hover:bg-slate-800/50 transition-colors cursor-pointer"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-white truncate">
                  {market.question}
                </h3>
                <div className="flex gap-2 mt-1">
                  {market.outcomes.slice(0, 2).map((outcome, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-slate-700 px-2 py-0.5 rounded"
                    >
                      {outcome}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <p className={`text-lg font-bold ${getPriceColor(market.lastTradePrice)}`}>
                  {formatPrice(market.lastTradePrice)}
                </p>
                <p className="text-xs text-slate-400">
                  Vol: {formatVolume(market.volume)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}