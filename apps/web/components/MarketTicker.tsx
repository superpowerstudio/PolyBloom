"use client";

import { useMemo } from "react";
import { CoingeckoMarket } from "@/lib/stores/marketsStore";

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
  if (loading) {
    return (
      <div className="panel flex items-center justify-center min-h-64">
        <p className="text-slate-400">Loading markets...</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {markets.slice(0, 10).map((market) => (
        <MarketTicker key={market.id} market={market} />
      ))}
    </div>
  );
}
