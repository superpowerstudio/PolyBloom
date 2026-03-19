"use client";

import { useEffect, useMemo } from "react";
import { useMarketsStore } from "@/lib/stores/marketsStore";
import { MarketTicker } from "@/components/MarketTicker";
import { useBinanceMiniTicker } from "@/hooks/useBinanceMiniTicker";

export function MarketOverviewPanel({ limit = 20 }: { limit?: number }) {
  const { markets, loading, error, fetchTopMarkets } = useMarketsStore();

  useEffect(() => {
    fetchTopMarkets();
  }, [fetchTopMarkets]);

  const symbols = useMemo(
    () => markets.slice(0, limit).map((m) => `${m.symbol.toUpperCase()}USDT`),
    [markets, limit],
  );

  const tickers = useBinanceMiniTicker(symbols);

  return (
    <div className="space-y-2">
      {loading ? (
        <div className="panel flex items-center justify-center min-h-32">
          <p className="text-slate-400">Loading top markets…</p>
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
