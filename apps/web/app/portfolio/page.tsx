"use client";

import { useState } from "react";

export default function PortfolioPage() {
  const [showExportModal, setShowExportModal] = useState(false);

  // Demo portfolio data
  const totalValue = 412800000;
  const ytdChange = 4.2;

  const holdings = [
    { name: "Gulfstream G650", category: "Aviation", value: 65000000, change: 2.1 },
    { name: "M/Y Azzurra", category: "Maritime", value: 120000000, change: -1.3 },
    { name: "Manhattan Penthouse", category: "Real Estate", value: 85000000, change: 5.8 },
    { name: "Picasso — Femme Assise", category: "Art", value: 42800000, change: 12.4 },
    { name: "BTC Cold Storage", category: "Crypto", value: 45000000, change: 18.2 },
    { name: "ETH Position", category: "Crypto", value: 28000000, change: -5.1 },
    { name: "Polymarket Holdings", category: "Prediction", value: 12000000, change: 8.7 },
    { name: "Treasury Bonds", category: "Fixed Income", value: 15000000, change: 0.8 },
  ];

  const allocation = [
    { name: "Real Estate", percentage: 20.6, color: "#C49A3C" },
    { name: "Aviation", percentage: 15.7, color: "#795900" },
    { name: "Maritime", percentage: 29.1, color: "#D2C5B1" },
    { name: "Art", percentage: 10.4, color: "#807665" },
    { name: "Crypto", percentage: 17.7, color: "#22c55e" },
    { name: "Other", percentage: 6.5, color: "#4E4637" },
  ];

  const formatCurrency = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
    return `$${value.toFixed(0)}`;
  };

  // SVG Donut Chart
  const DonutChart = () => {
    const size = 200;
    const strokeWidth = 8;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    let currentOffset = 0;

    return (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {allocation.map((item, index) => {
          const strokeDasharray = `${(item.percentage / 100) * circumference} ${circumference}`;
          const strokeDashoffset = -currentOffset;
          currentOffset += (item.percentage / 100) * circumference;

          return (
            <circle
              key={index}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={item.color}
              strokeWidth={strokeWidth}
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              transform={`rotate(-90 ${size / 2} ${size / 2})`}
            />
          );
        })}
        <text
          x={size / 2}
          y={size / 2 - 10}
          textAnchor="middle"
          fill="#C49A3C"
          fontFamily="Newsreader, serif"
          fontStyle="italic"
          fontSize="14"
        >
          ALLOCATION
        </text>
      </svg>
    );
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0A1019' }}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <p style={{ fontFamily: 'Space Grotesk, monospace', fontSize: '0.75rem', color: '#807665', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
            THE BESPOKE LEDGER / PORTFOLIO ARCHIVE
          </p>
          <h1 style={{ fontFamily: 'Newsreader, serif', fontStyle: 'italic', fontSize: '2.5rem', color: '#C49A3C', fontWeight: 400 }}>
            Portfolio Archive
          </h1>
        </div>

        {/* Large Valuation */}
        <div className="mb-8">
          <div className="flex items-end gap-4 mb-4">
            <span style={{ fontFamily: 'Newsreader, serif', fontSize: '5rem', fontWeight: 700, color: '#F9F9FF', lineHeight: 1 }}>
              ${formatCurrency(totalValue).replace('$', '')}
            </span>
            <span style={{ fontFamily: 'Space Grotesk, monospace', fontSize: '2rem', color: '#C49A3C' }}>M</span>
          </div>
          
          <div className="flex items-center gap-4 mb-6">
            <span
              className="px-3 py-1 text-sm"
              style={{
                fontFamily: 'Space Grotesk, monospace',
                backgroundColor: '#C49A3C',
                color: '#0A1019',
                borderRadius: '0.125rem',
              }}
            >
              +{ytdChange}% FISCAL YTD
            </span>
          </div>

          <p style={{ fontFamily: 'Newsreader, serif', fontStyle: 'italic', fontSize: '1.125rem', color: '#D2C5B1', maxWidth: '600px', lineHeight: 1.6 }}>
            "The careful stewardship of capital across diverse asset classes represents not merely financial prudence, but a philosophical commitment to enduring value."
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Holdings Table */}
          <div className="lg:col-span-2">
            <div className="rounded-sm" style={{ backgroundColor: '#111823', border: '1px solid #1C2431' }}>
              <div className="p-4 border-b" style={{ borderColor: '#1C2431' }}>
                <h2 style={{ fontFamily: 'Space Grotesk, monospace', fontSize: '0.75rem', color: '#C49A3C', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  Holdings Ledger
                </h2>
              </div>
              
              <div className="divide-y" style={{ borderColor: '#1C2431' }}>
                {holdings.map((holding, index) => (
                  <div key={index} className="flex items-center justify-between p-4">
                    <div className="flex-1">
                      <p style={{ fontFamily: 'Work Sans, sans-serif', fontSize: '0.875rem', color: '#F9F9FF', marginBottom: '2px' }}>
                        {holding.name}
                      </p>
                      <p style={{ fontFamily: 'Space Grotesk, monospace', fontSize: '0.75rem', color: '#807665' }}>
                        {holding.category}
                      </p>
                    </div>
                    <div className="text-right">
                      <p style={{ fontFamily: 'Space Grotesk, monospace', fontSize: '0.875rem', color: '#F9F9FF' }}>
                        {formatCurrency(holding.value)}
                      </p>
                      <p style={{
                        fontFamily: 'Space Grotesk, monospace',
                        fontSize: '0.75rem',
                        color: holding.change >= 0 ? '#22c55e' : '#ef4444',
                      }}>
                        {holding.change >= 0 ? '+' : ''}{holding.change}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Allocation Chart */}
          <div className="lg:col-span-1">
            <div className="rounded-sm p-6" style={{ backgroundColor: '#111823', border: '1px solid #1C2431' }}>
              <h2 style={{ fontFamily: 'Space Grotesk, monospace', fontSize: '0.75rem', color: '#C49A3C', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem' }}>
                Asset Allocation
              </h2>
              
              <div className="flex justify-center mb-6">
                <DonutChart />
              </div>

              <div className="space-y-3">
                {allocation.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-sm"
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span style={{ fontFamily: 'Work Sans, sans-serif', fontSize: '0.75rem', color: '#D2C5B1' }}>
                        {item.name}
                      </span>
                    </div>
                    <span style={{ fontFamily: 'Space Grotesk, monospace', fontSize: '0.75rem', color: '#F9F9FF' }}>
                      {item.percentage}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Export Button */}
            <button
              onClick={() => setShowExportModal(true)}
              className="w-full mt-4 py-3 text-sm uppercase tracking-wider transition-colors"
              style={{
                fontFamily: 'Space Grotesk, monospace',
                background: 'linear-gradient(135deg, #C49A3C 0%, #795900 100%)',
                color: '#0A1019',
                border: 'none',
                borderRadius: '0.125rem',
              }}
            >
              Export Dossier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}