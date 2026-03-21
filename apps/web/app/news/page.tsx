"use client";

import { useState } from "react";

interface NewsItem {
  id: string;
  title: string;
  source: string;
  timestamp: number;
  sentiment: "bullish" | "neutral" | "bearish";
  relatedMarkets: string[];
  impact: "high" | "medium" | "low";
  summary: string;
}

export default function NewsPage() {
  const [sentimentFilter, setSentimentFilter] = useState("all");
  const [impactFilter, setImpactFilter] = useState("all");

  const news: NewsItem[] = [
    {
      id: "news-1",
      title: "Bitcoin Halving Expected Q3 2026",
      source: "CoinDesk",
      timestamp: Date.now() - 3600000,
      sentiment: "bullish",
      relatedMarkets: ["BTC", "ETH"],
      impact: "high",
      summary: "Bitcoin's next halving event is projected for Q3 2026, historically a major catalyst for price appreciation.",
    },
    {
      id: "news-2",
      title: "Ethereum Shanghai Upgrade Success",
      source: "TheBlock",
      timestamp: Date.now() - 7200000,
      sentiment: "bullish",
      relatedMarkets: ["ETH"],
      impact: "high",
      summary: "The Shanghai upgrade has successfully enabled staking withdrawals, increasing network participation.",
    },
    {
      id: "news-3",
      title: "Regulatory Clarity on Staking",
      source: "Reuters",
      timestamp: Date.now() - 10800000,
      sentiment: "neutral",
      relatedMarkets: ["ETH", "LIDO"],
      impact: "medium",
      summary: "New regulatory guidance provides clearer framework for staking services across major jurisdictions.",
    },
    {
      id: "news-4",
      title: "Concerns Over FTX Contagion",
      source: "Bloomberg",
      timestamp: Date.now() - 14400000,
      sentiment: "bearish",
      relatedMarkets: ["FTT", "SOL"],
      impact: "high",
      summary: "Ongoing FTX bankruptcy proceedings reveal additional exposure across multiple crypto projects.",
    },
    {
      id: "news-5",
      title: "Solana Network Congestion",
      source: "CoinTelegraph",
      timestamp: Date.now() - 18000000,
      sentiment: "bearish",
      relatedMarkets: ["SOL"],
      impact: "medium",
      summary: "Solana experiences temporary network congestion due to increased transaction volume.",
    },
    {
      id: "news-6",
      title: "Polymarket Volume Hits New High",
      source: "Dune Analytics",
      timestamp: Date.now() - 21600000,
      sentiment: "bullish",
      relatedMarkets: ["POLY"],
      impact: "medium",
      summary: "Polymarket records record trading volume as election markets gain mainstream attention.",
    },
  ];

  const sentimentColors = {
    bullish: { border: "#22c55e", bg: "rgba(34, 197, 94, 0.1)", text: "#22c55e" },
    bearish: { border: "#ef4444", bg: "rgba(239, 68, 68, 0.1)", text: "#ef4444" },
    neutral: { border: "#eab308", bg: "rgba(234, 179, 8, 0.1)", text: "#eab308" },
  };

  const impactIcons = {
    high: "🔴",
    medium: "🟡",
    low: "🟢",
  };

  const filteredNews = news.filter((item) => {
    if (sentimentFilter !== "all" && item.sentiment !== sentimentFilter) return false;
    if (impactFilter !== "all" && item.impact !== impactFilter) return false;
    return true;
  });

  const formatTimeAgo = (timestamp: number) => {
    const minutes = Math.floor((Date.now() - timestamp) / 60000);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0A1019' }}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <p style={{ fontFamily: 'Space Grotesk, monospace', fontSize: '0.75rem', color: '#807665', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
            NEWS RADAR / SENTIMENT ARCHIVE
          </p>
          <h1 style={{ fontFamily: 'Newsreader, serif', fontStyle: 'italic', fontSize: '2.5rem', color: '#C49A3C', fontWeight: 400 }}>
            News Radar
          </h1>
        </div>

        {/* Daily Intelligence Briefing Hero */}
        <div className="mb-8 rounded-sm p-6" style={{ backgroundColor: '#111823', border: '1px solid #1C2431' }}>
          <div className="flex items-center gap-2 mb-4">
            <span style={{ fontFamily: 'Space Grotesk, monospace', fontSize: '0.75rem', color: '#C49A3C', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              📰 Daily Intelligence Briefing
            </span>
          </div>
          <p style={{ fontFamily: 'Newsreader, serif', fontStyle: 'italic', fontSize: '1.25rem', color: '#F9F9FF', lineHeight: 1.6, marginBottom: '1rem' }}>
            "The convergence of regulatory clarity and institutional adoption suggests we are witnessing the maturation of digital asset markets. Bitcoin's halving cycle, combined with Ethereum's staking revolution, creates a unique macro environment for prediction market participants."
          </p>
          <p style={{ fontFamily: 'Space Grotesk, monospace', fontSize: '0.75rem', color: '#807665' }}>
            — AI-generated market analysis · {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex gap-2">
            <span style={{ fontFamily: 'Space Grotesk, monospace', fontSize: '0.75rem', color: '#807665', alignSelf: 'center', marginRight: '0.5rem' }}>
              SENTIMENT:
            </span>
            {["all", "bullish", "bearish", "neutral"].map((filter) => (
              <button
                key={filter}
                onClick={() => setSentimentFilter(filter)}
                className="px-3 py-1.5 text-xs uppercase tracking-wider transition-colors"
                style={{
                  fontFamily: 'Space Grotesk, monospace',
                  backgroundColor: sentimentFilter === filter ? '#C49A3C' : '#111823',
                  color: sentimentFilter === filter ? '#0A1019' : '#D2C5B1',
                  border: `1px solid ${sentimentFilter === filter ? '#C49A3C' : '#1C2431'}`,
                  borderRadius: '0.125rem',
                }}
              >
                {filter}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <span style={{ fontFamily: 'Space Grotesk, monospace', fontSize: '0.75rem', color: '#807665', alignSelf: 'center', marginRight: '0.5rem' }}>
              IMPACT:
            </span>
            {["all", "high", "medium", "low"].map((filter) => (
              <button
                key={filter}
                onClick={() => setImpactFilter(filter)}
                className="px-3 py-1.5 text-xs uppercase tracking-wider transition-colors"
                style={{
                  fontFamily: 'Space Grotesk, monospace',
                  backgroundColor: impactFilter === filter ? '#C49A3C' : '#111823',
                  color: impactFilter === filter ? '#0A1019' : '#D2C5B1',
                  border: `1px solid ${impactFilter === filter ? '#C49A3C' : '#1C2431'}`,
                  borderRadius: '0.125rem',
                }}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* News Feed */}
        <div className="space-y-4">
          {filteredNews.map((item) => (
            <div
              key={item.id}
              className="rounded-sm p-4 transition-colors"
              style={{
                backgroundColor: '#111823',
                border: `1px solid #1C2431`,
                borderLeft: `4px solid ${sentimentColors[item.sentiment].border}`,
              }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span style={{ fontFamily: 'Space Grotesk, monospace', fontSize: '0.875rem', color: '#F9F9FF' }}>
                      {impactIcons[item.impact]}
                    </span>
                    <span style={{ fontFamily: 'Space Grotesk, monospace', fontSize: '0.75rem', color: '#807665' }}>
                      {item.source} · {formatTimeAgo(item.timestamp)}
                    </span>
                  </div>
                  
                  <h3 style={{ fontFamily: 'Work Sans, sans-serif', fontSize: '1rem', color: '#F9F9FF', marginBottom: '0.5rem', fontWeight: 500 }}>
                    {item.title}
                  </h3>
                  
                  <p style={{ fontFamily: 'Work Sans, sans-serif', fontSize: '0.875rem', color: '#D2C5B1', lineHeight: 1.5, marginBottom: '0.75rem' }}>
                    {item.summary}
                  </p>

                  {/* Sentiment Score Bar */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-1.5 flex-1 rounded-full" style={{ backgroundColor: '#1C2431' }}>
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: item.sentiment === "bullish" ? "80%" : item.sentiment === "bearish" ? "75%" : "50%",
                          backgroundColor: sentimentColors[item.sentiment].border,
                        }}
                      ></div>
                    </div>
                    <span
                      className="px-2 py-0.5 text-xs uppercase"
                      style={{
                        fontFamily: 'Space Grotesk, monospace',
                        backgroundColor: sentimentColors[item.sentiment].bg,
                        color: sentimentColors[item.sentiment].text,
                        borderRadius: '0.125rem',
                      }}
                    >
                      {item.sentiment}
                    </span>
                  </div>

                  {/* Related Markets */}
                  <div className="flex gap-2">
                    {item.relatedMarkets.map((market) => (
                      <span
                        key={market}
                        className="px-2 py-0.5 text-xs"
                        style={{
                          fontFamily: 'Space Grotesk, monospace',
                          backgroundColor: '#1C2431',
                          color: '#C49A3C',
                          borderRadius: '0.125rem',
                        }}
                      >
                        ${market}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}