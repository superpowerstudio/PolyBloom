"use client";

import { useMemo, useState, useEffect } from "react";
import { CoingeckoMarket, useMarketsStore } from "@/lib/stores/marketsStore";

interface MarketTickerProps {
  market: CoingeckoMarket;
  livePrice?: number;
}

export function MarketTicker({ market, livePrice }: MarketTickerProps) {
  const displayPrice = livePrice ?? market.current_price;
  const priceChangeColor =
    market.price_change_percentage_24h >= 0 ? "text-green-400" : "text-red-400";

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: displayPrice < 1 ? 8 : 2,
  }).format(displayPrice);

  const formattedChange = `${market.price_change_percentage_24h >= 0 ? "+" : ""}${market.price_change_percentage_24h.toFixed(2)}%`;

  return (
    <div className="panel flex items-center justify-between">
      <div className="flex items-center gap-3 flex-1">
        <img
          src={market.image}
          alt={market.name}
          className="w-8 h-8 rounded-full"
        />
        <div>
          <h3 className="neon-text text-sm">{market.symbol.toUpperCase()}</h3>
          <p className="text-xs text-slate-400">{market.name}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-sm font-mono text-white">{formattedPrice}</p>
        <p className={`text-xs font-mono ${priceChangeColor}`}>
          {formattedChange}
        </p>
      </div>
    </div>
  );
}

interface MarketGridProps {
  markets: CoingeckoMarket[];
  loading?: boolean;
}

export function MarketGrid({ markets, loading }: MarketGridProps) {
  const lastUpdated = useMarketsStore((state) => state.lastUpdated);
  const [timeAgo, setTimeAgo] = useState<string>("just now");

  useEffect(() => {
    if (!lastUpdated) return;

    const updateTimeAgo = () => {
      const seconds = Math.floor((Date.now() - lastUpdated) / 1000);
      if (seconds < 60) {
        setTimeAgo(`${seconds}s ago`);
      } else if (seconds < 3600) {
        const minutes = Math.floor(seconds / 60);
        setTimeAgo(`${minutes}m ago`);
      } else {
        const hours = Math.floor(seconds / 3600);
        setTimeAgo(`${hours}h ago`);
      }
    };

    updateTimeAgo();
    const interval = setInterval(updateTimeAgo, 1000);
    return () => clearInterval(interval);
  }, [lastUpdated]);

  if (loading) {
    return (
      <div className="space-y-2">
        <div className="flex justify-between items-center text-xs text-slate-400 mb-2">
          <span>Top 10 Markets</span>
          <span>Loading...</span>
        </div>
        {[...Array(10)].map((_, i) => (
          <div key={i} className="panel animate-pulse">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1">
                <div className="w-8 h-8 rounded-full bg-slate-700"></div>
                <div>
                  <div className="h-4 bg-slate-700 rounded w-16 mb-1"></div>
                  <div className="h-3 bg-slate-700 rounded w-24"></div>
                </div>
              </div>
              <div className="text-right">
                <div className="h-4 bg-slate-700 rounded w-20 mb-1"></div>
                <div className="h-3 bg-slate-700 rounded w-12"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-xs text-slate-400 mb-2">
        <span>Top 10 Markets</span>
        <span>Last updated: {timeAgo}</span>
      </div>
      {markets.slice(0, 10).map((market) => (
        <MarketTicker key={market.id} market={market} />
      ))}
    </div>
  );
}
