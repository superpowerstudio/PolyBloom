"use client";

import { useState, useEffect } from "react";
import { usePolymarketStore } from "@/lib/stores/polymarketStore";

export default function PolymarketPage() {
  const { markets, loading, error, fetchMarkets } = usePolymarketStore();
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("volume");

  useEffect(() => {
    fetchMarkets(50);
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
    if (price === undefined) return "#807665";
    if (price >= 0.6) return "#22c55e";
    if (price <= 0.4) return "#ef4444";
    return "#eab308";
  };

  const categories = ["all", "crypto", "politics", "sports", "science", "finance"];
  const sortOptions = [
    { value: "volume", label: "Volume" },
    { value: "probability", label: "Probability" },
    { value: "closing", label: "Closing Soon" },
    { value: "new", label: "New" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: '#0A1019' }}>
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="mb-8">
            <div className="h-10 rounded w-64 mb-2 animate-pulse" style={{ backgroundColor: '#1C2431' }}></div>
            <div className="h-4 rounded w-96 animate-pulse" style={{ backgroundColor: '#1C2431' }}></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="rounded-sm p-4 animate-pulse" style={{ backgroundColor: '#111823', border: '1px solid #1C2431' }}>
                <div className="h-4 rounded w-3/4 mb-3" style={{ backgroundColor: '#1C2431' }}></div>
                <div className="h-8 rounded w-16 mb-3" style={{ backgroundColor: '#1C2431' }}></div>
                <div className="h-2 rounded-full mb-3" style={{ backgroundColor: '#1C2431' }}></div>
                <div className="flex justify-between">
                  <div className="h-3 rounded w-12" style={{ backgroundColor: '#1C2431' }}></div>
                  <div className="h-3 rounded w-20" style={{ backgroundColor: '#1C2431' }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const hotMarkets = [...markets]
    .sort((a, b) => (b.volume || 0) - (a.volume || 0))
    .slice(0, 5);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0A1019' }}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 style={{ fontFamily: 'Newsreader, serif', fontStyle: 'italic', fontSize: '2.5rem', color: '#C49A3C', fontWeight: 400 }}>
            POLYMARKET INTELLIGENCE
          </h1>
          <p style={{ fontFamily: 'Work Sans, sans-serif', fontSize: '0.875rem', color: '#807665', marginTop: '0.5rem' }}>
            Real-time prediction markets · {markets.length} active markets
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className="px-3 py-1.5 text-xs uppercase tracking-wider transition-colors"
                style={{
                  fontFamily: 'Space Grotesk, monospace',
                  backgroundColor: filter === cat ? '#C49A3C' : '#111823',
                  color: filter === cat ? '#0A1019' : '#D2C5B1',
                  border: `1px solid ${filter === cat ? '#C49A3C' : '#1C2431'}`,
                  borderRadius: '0.125rem',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            {sortOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setSortBy(opt.value)}
                className="px-3 py-1.5 text-xs uppercase tracking-wider transition-colors"
                style={{
                  fontFamily: 'Space Grotesk, monospace',
                  backgroundColor: sortBy === opt.value ? '#C49A3C' : '#111823',
                  color: sortBy === opt.value ? '#0A1019' : '#D2C5B1',
                  border: `1px solid ${sortBy === opt.value ? '#C49A3C' : '#1C2431'}`,
                  borderRadius: '0.125rem',
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {markets.map((market) => (
                <div
                  key={market.id}
                  className="rounded-sm p-4 transition-colors cursor-pointer"
                  style={{
                    backgroundColor: '#111823',
                    border: '1px solid #1C2431',
                  }}
                >
                  <h3 style={{ fontFamily: 'Work Sans, sans-serif', fontSize: '0.875rem', color: '#F9F9FF', marginBottom: '0.75rem', lineHeight: 1.4 }}>
                    {market.question}
                  </h3>
                  
                  <div style={{ fontFamily: 'Newsreader, serif', fontSize: '2rem', fontWeight: 700, color: getPriceColor(market.lastTradePrice), marginBottom: '0.75rem' }}>
                    {formatPrice(market.lastTradePrice)}
                  </div>

                  <div className="h-1.5 rounded-full mb-3" style={{ backgroundColor: '#1C2431' }}>
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${(market.lastTradePrice || 0) * 100}%`,
                        backgroundColor: getPriceColor(market.lastTradePrice),
                      }}
                    ></div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span style={{ fontFamily: 'Space Grotesk, monospace', fontSize: '0.75rem', color: '#807665' }}>
                      Vol: {formatVolume(market.volume)}
                    </span>
                    <span style={{ fontFamily: 'Space Grotesk, monospace', fontSize: '0.625rem', color: '#C49A3C', backgroundColor: '#C49A3C20', padding: '2px 6px', borderRadius: '0.125rem' }}>
                      {market.outcomes?.[0] || "YES"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="rounded-sm p-4" style={{ backgroundColor: '#111823', border: '1px solid #1C2431' }}>
              <h2 style={{ fontFamily: 'Space Grotesk, monospace', fontSize: '0.75rem', color: '#C49A3C', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>
                🔥 Hot Right Now
              </h2>
              <div className="space-y-3">
                {hotMarkets.map((market, idx) => (
                  <div key={market.id} className="flex items-start gap-3">
                    <span style={{ fontFamily: 'Space Grotesk, monospace', fontSize: '0.75rem', color: '#C49A3C' }}>
                      {idx + 1}.
                    </span>
                    <div className="flex-1">
                      <p style={{ fontFamily: 'Work Sans, sans-serif', fontSize: '0.75rem', color: '#F9F9FF', lineHeight: 1.3 }}>
                        {market.question?.slice(0, 60)}...
                      </p>
                      <p style={{ fontFamily: 'Space Grotesk, monospace', fontSize: '0.625rem', color: '#807665', marginTop: '2px' }}>
                        {formatVolume(market.volume)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}