"use client";

import Link from "next/link";

export default function Home() {
  const features = [
    { icon: "📊", title: "Live Markets", desc: "Real-time data from CoinGecko and Binance" },
    { icon: "🎰", title: "Polymarket", desc: "Prediction markets and CLOB trading" },
    { icon: "🤖", title: "AI Agents", desc: "Trading strategies, paper-trading by default" },
    { icon: "📰", title: "News Radar", desc: "Headlines with sentiment analysis" },
    { icon: "⏮️", title: "Backtester", desc: "Historical simulation and strategy replay" },
    { icon: "🎨", title: "Multi-Panel Grid", desc: "Drag, resize and dock panels" },
  ];

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#0A1019' }}>
      {/* Forensic Dot Grid */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: "radial-gradient(circle, #C49A3C 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 relative z-10">
        <div className="text-center mb-12">
          <p
            style={{
              fontFamily: 'Space Grotesk, monospace',
              fontSize: '0.75rem',
              color: '#807665',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '1rem',
            }}
          >
            THE BESPOKE LEDGER / GRAND OPUS PROTOCOL
          </p>
          <h1
            style={{
              fontFamily: 'Newsreader, serif',
              fontStyle: 'italic',
              fontSize: '4rem',
              color: '#C49A3C',
              fontWeight: 400,
              lineHeight: 1.1,
              marginBottom: '1rem',
            }}
          >
            PolyBloom
          </h1>
          <p
            style={{
              fontFamily: 'Work Sans, sans-serif',
              fontSize: '1.125rem',
              color: '#D2C5B1',
              maxWidth: '500px',
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            Private-grade crypto intelligence & Polymarket terminal
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mb-12">
          {features.map((f, i) => (
            <div
              key={i}
              className="p-4"
              style={{
                backgroundColor: '#111823',
                border: '1px solid #1C2431',
                borderRadius: '0.125rem',
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span style={{ fontSize: '1.25rem' }}>{f.icon}</span>
                <h3
                  style={{
                    fontFamily: 'Space Grotesk, monospace',
                    fontSize: '0.75rem',
                    color: '#C49A3C',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  {f.title}
                </h3>
              </div>
              <p
                style={{
                  fontFamily: 'Work Sans, sans-serif',
                  fontSize: '0.875rem',
                  color: '#D2C5B1',
                  lineHeight: 1.5,
                }}
              >
                {f.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-4">
          <Link
            href="/terminal"
            className="px-8 py-3 transition-colors"
            style={{
              fontFamily: 'Space Grotesk, monospace',
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              backgroundColor: '#C49A3C',
              color: '#0A1019',
              borderRadius: '0.125rem',
            }}
          >
            Launch Terminal →
          </Link>
          <Link
            href="/polymarket"
            className="px-8 py-3 transition-colors"
            style={{
              fontFamily: 'Space Grotesk, monospace',
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: '#C49A3C',
              border: '1px solid #C49A3C',
              borderRadius: '0.125rem',
            }}
          >
            Polymarket
          </Link>
        </div>

        {/* Page Links */}
        <div className="flex gap-6 mt-8">
          {[
            { href: '/signals', label: 'Signals' },
            { href: '/portfolio', label: 'Portfolio' },
            { href: '/news', label: 'News' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                fontFamily: 'Space Grotesk, monospace',
                fontSize: '0.75rem',
                color: '#807665',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div
        className="py-6 text-center"
        style={{ borderTop: '1px solid #1C2431' }}
      >
        <p
          style={{
            fontFamily: 'Space Grotesk, monospace',
            fontSize: '0.625rem',
            color: '#4E4637',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          Built with Next.js 15, Expo 52 · The Bespoke Ledger Design System
        </p>
      </div>
    </div>
  );
}