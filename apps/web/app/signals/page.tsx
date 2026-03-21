"use client";

import { useState } from "react";

export default function SignalsPage() {
  const [selectedAsset, setSelectedAsset] = useState("BTC");
  const [timeframe, setTimeframe] = useState("1H");

  const assets = ["BTC", "ETH", "SOL", "BNB", "XRP"];
  const timeframes = ["5M", "15M", "1H", "4H", "1D"];

  // Mock signal data
  const signals: Record<string, Record<string, { value: string; signal: "bullish" | "bearish" | "neutral"; confidence: number }>> = {
    BTC: {
      rsi: { value: "62.4", signal: "bullish", confidence: 75 },
      macd: { value: "0.0234", signal: "bullish", confidence: 82 },
      vwap: { value: "67,234.50", signal: "neutral", confidence: 60 },
      ema20: { value: "67,100.00", signal: "bullish", confidence: 70 },
      ema50: { value: "66,800.00", signal: "bullish", confidence: 65 },
    },
    ETH: {
      rsi: { value: "45.2", signal: "neutral", confidence: 55 },
      macd: { value: "-0.0012", signal: "bearish", confidence: 68 },
      vwap: { value: "3,456.78", signal: "bearish", confidence: 72 },
      ema20: { value: "3,480.00", signal: "bearish", confidence: 65 },
      ema50: { value: "3,520.00", signal: "bearish", confidence: 70 },
    },
    SOL: {
      rsi: { value: "71.8", signal: "bullish", confidence: 80 },
      macd: { value: "0.1567", signal: "bullish", confidence: 85 },
      vwap: { value: "178.45", signal: "bullish", confidence: 78 },
      ema20: { value: "175.00", signal: "bullish", confidence: 82 },
      ema50: { value: "168.00", signal: "bullish", confidence: 75 },
    },
    BNB: {
      rsi: { value: "55.3", signal: "neutral", confidence: 50 },
      macd: { value: "0.0045", signal: "neutral", confidence: 55 },
      vwap: { value: "589.23", signal: "neutral", confidence: 52 },
      ema20: { value: "590.00", signal: "neutral", confidence: 58 },
      ema50: { value: "585.00", signal: "bullish", confidence: 60 },
    },
    XRP: {
      rsi: { value: "38.9", signal: "bearish", confidence: 72 },
      macd: { value: "-0.0089", signal: "bearish", confidence: 78 },
      vwap: { value: "0.5234", signal: "bearish", confidence: 70 },
      ema20: { value: "0.5300", signal: "bearish", confidence: 75 },
      ema50: { value: "0.5450", signal: "bearish", confidence: 80 },
    },
  };

  const getOverallSignal = (asset: string) => {
    const assetSignals = signals[asset];
    const bullishCount = Object.values(assetSignals).filter(s => s.signal === "bullish").length;
    const bearishCount = Object.values(assetSignals).filter(s => s.signal === "bearish").length;
    
    if (bullishCount > bearishCount) return { signal: "BULLISH", confidence: 78, color: "#22c55e" };
    if (bearishCount > bullishCount) return { signal: "BEARISH", confidence: 72, color: "#ef4444" };
    return { signal: "NEUTRAL", confidence: 55, color: "#eab308" };
  };

  const getSignalColor = (signal: string) => {
    switch (signal) {
      case "bullish": return "#22c55e";
      case "bearish": return "#ef4444";
      default: return "#eab308";
    }
  };

  const currentSignal = getOverallSignal(selectedAsset);
  const currentSignals = signals[selectedAsset];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0A1019' }}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <p style={{ fontFamily: 'Space Grotesk, monospace', fontSize: '0.75rem', color: '#807665', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
            SIGNAL INTELLIGENCE / NODE 07
          </p>
          <h1 style={{ fontFamily: 'Newsreader, serif', fontStyle: 'italic', fontSize: '2.5rem', color: '#C49A3C', fontWeight: 400 }}>
            Technical Analysis
          </h1>
        </div>

        {/* Asset Selector */}
        <div className="flex gap-2 mb-6">
          {assets.map((asset) => (
            <button
              key={asset}
              onClick={() => setSelectedAsset(asset)}
              className="px-4 py-2 text-sm transition-colors"
              style={{
                fontFamily: 'Space Grotesk, monospace',
                backgroundColor: selectedAsset === asset ? '#C49A3C' : '#111823',
                color: selectedAsset === asset ? '#0A1019' : '#D2C5B1',
                border: `1px solid ${selectedAsset === asset ? '#C49A3C' : '#1C2431'}`,
                borderRadius: '0.125rem',
              }}
            >
              {asset}
            </button>
          ))}
        </div>

        {/* Timeframe Tabs */}
        <div className="flex gap-2 mb-8">
          {timeframes.map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className="px-3 py-1.5 text-xs uppercase tracking-wider transition-colors"
              style={{
                fontFamily: 'Space Grotesk, monospace',
                backgroundColor: timeframe === tf ? '#C49A3C' : '#111823',
                color: timeframe === tf ? '#0A1019' : '#D2C5B1',
                border: `1px solid ${timeframe === tf ? '#C49A3C' : '#1C2431'}`,
                borderRadius: '0.125rem',
              }}
            >
              {tf}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Signal Summary Card */}
          <div className="lg:col-span-1">
            <div className="rounded-sm p-6" style={{ backgroundColor: '#111823', border: '1px solid #1C2431' }}>
              <p style={{ fontFamily: 'Space Grotesk, monospace', fontSize: '0.75rem', color: '#807665', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>
                Overall Signal
              </p>
              <div style={{ fontFamily: 'Newsreader, serif', fontSize: '3rem', fontWeight: 700, color: currentSignal.color, marginBottom: '0.5rem' }}>
                {currentSignal.signal}
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 flex-1 rounded-full" style={{ backgroundColor: '#1C2431' }}>
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${currentSignal.confidence}%`,
                      backgroundColor: currentSignal.color,
                    }}
                  ></div>
                </div>
                <span style={{ fontFamily: 'Space Grotesk, monospace', fontSize: '0.875rem', color: '#D2C5B1' }}>
                  {currentSignal.confidence}%
                </span>
              </div>
              <p style={{ fontFamily: 'Space Grotesk, monospace', fontSize: '0.75rem', color: '#807665', marginTop: '1rem' }}>
                Confidence Level
              </p>
            </div>
          </div>

          {/* Indicators Grid */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Object.entries(currentSignals).map(([key, data]) => (
                <div
                  key={key}
                  className="rounded-sm p-4"
                  style={{ backgroundColor: '#111823', border: '1px solid #1C2431' }}
                >
                  <p style={{ fontFamily: 'Space Grotesk, monospace', fontSize: '0.75rem', color: '#807665', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
                    {key.toUpperCase()}
                  </p>
                  <div style={{ fontFamily: 'Newsreader, serif', fontSize: '1.5rem', fontWeight: 700, color: '#F9F9FF', marginBottom: '0.5rem' }}>
                    {data.value}
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className="px-2 py-0.5 text-xs uppercase"
                      style={{
                        fontFamily: 'Space Grotesk, monospace',
                        backgroundColor: `${getSignalColor(data.signal)}20`,
                        color: getSignalColor(data.signal),
                        borderRadius: '0.125rem',
                      }}
                    >
                      {data.signal}
                    </span>
                    <span style={{ fontFamily: 'Space Grotesk, monospace', fontSize: '0.75rem', color: '#807665' }}>
                      {data.confidence}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}