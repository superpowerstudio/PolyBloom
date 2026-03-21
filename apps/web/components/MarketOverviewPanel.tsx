"use client";

import { useEffect, useMemo, useState } from "react";
import { useMarketsStore } from "@/lib/stores/marketsStore";
import { MarketTicker } from "@/components/MarketTicker";
import { useBinanceMiniTicker } from "@/hooks/useBinanceMiniTicker";

export function MarketOverviewPanel({ limit = 20 }: { limit?: number }) {
  const { markets, loading, error, fetchTopMarkets } = useMarketsStore();
  const [isClient, setIsClient] = useState(false);

  // Set isClient to true after hydration to avoid SSR mismatch
  useEffect(() => {
    setIsClient(true);
    fetchTopMarkets();
  }, [fetchTopMarkets]);

  const symbols = useMemo(
    () => markets.slice(0, limit).map((m) => `${m.symbol.toUpperCase()}USDT`),
    [markets, limit],
  );

  const tickers = useBinanceMiniTicker(symbols);

  // Render empty state on server, full state on client
  if (!isClient) {
    return (
      <div className="space-y-2">
        <div className="panel flex items-center justify-center min-h-32">
          <p className="text-slate-400">Loading top markets…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {loading ? (
        <div className="space-y-2">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="panel animate-pulse">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-8 h-8 rounded-full" style={{ backgroundColor: '#1C2431' }}></div>
                  <div>
                    <div className="h-4 rounded w-16 mb-1" style={{ backgroundColor: '#1C2431' }}></div>
                    <div className="h-3 rounded w-24" style={{ backgroundColor: '#1C2431' }}></div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="h-4 rounded w-20 mb-1" style={{ backgroundColor: '#1C2431' }}></div>
                  <div className="h-3 rounded w-12" style={{ backgroundColor: '#1C2431' }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="panel text-red-400">{error}</div>
      ) : (
        <div className="space-y-2 max-h-[480px] overflow-y-auto pr-1">
          {markets.slice(0, limit).map((market) => {
            const symbolKey = `${market.symbol.toUpperCase()}USDT`;
            const live = tickers[symbolKey];
            const livePrice = live ? Number(live.c) : undefined;
            return (
              <MarketTicker
                key={market.id}
                market={market}
                livePrice={livePrice}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
