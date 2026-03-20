"use client";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#0a0a0a] via-slate-900 to-[#0a0a0a]">
      <div className="text-center mb-12">
        <h1 className="text-6xl font-bold mb-4">
          <span className="text-white">PolyBloom</span>
          <br />
          <span className="text-[#00ff9f]">Terminal</span>
        </h1>
        <p className="text-slate-400 text-xl mb-8">
          Ultimate Crypto Bloomberg Terminal + AI Trading Studio
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mb-12">
        <div className="rounded-lg border border-slate-700 bg-slate-900/50 p-4">
          <h3 className="text-[#00ff9f] font-semibold mb-2">📊 Live Markets</h3>
          <p className="text-slate-300 text-sm">
            Real-time data from CoinGecko and Binance
          </p>
        </div>
        <div className="rounded-lg border border-slate-700 bg-slate-900/50 p-4">
          <h3 className="text-[#00ff9f] font-semibold mb-2">🎰 Polymarket</h3>
          <p className="text-slate-300 text-sm">
            Prediction markets and CLOB trading
          </p>
        </div>
        <div className="rounded-lg border border-slate-700 bg-slate-900/50 p-4">
          <h3 className="text-[#00ff9f] font-semibold mb-2">🤖 OpenClaw</h3>
          <p className="text-slate-300 text-sm">
            AI trading strategies, paper-trading by default
          </p>
        </div>
        <div className="rounded-lg border border-slate-700 bg-slate-900/50 p-4">
          <h3 className="text-[#00ff9f] font-semibold mb-2">📰 News Radar</h3>
          <p className="text-slate-300 text-sm">
            Headlines with sentiment analysis
          </p>
        </div>
        <div className="rounded-lg border border-slate-700 bg-slate-900/50 p-4">
          <h3 className="text-[#00ff9f] font-semibold mb-2">⏮️ Backtester</h3>
          <p className="text-slate-300 text-sm">
            Historical simulation and strategy replay
          </p>
        </div>
        <div className="rounded-lg border border-slate-700 bg-slate-900/50 p-4">
          <h3 className="text-[#00ff9f] font-semibold mb-2">
            🎨 Multi-Panel Grid
          </h3>
          <p className="text-slate-300 text-sm">Drag, resize and dock panels</p>
        </div>
      </div>
      <div className="flex gap-4">
        <a href="/terminal">
          <button className="bg-[#00ff9f] text-black font-semibold px-8 py-3 rounded-lg hover:bg-[#00cc7a] transition-colors">
            Launch Terminal →
          </button>
        </a>
        <a href="/docs">
          <button className="border border-slate-700 text-white font-semibold px-8 py-3 rounded-lg hover:bg-slate-800 transition-colors">
            Documentation
          </button>
        </a>
      </div>
      <div className="mt-16 pt-8 border-t border-slate-700 w-full text-center text-slate-500">
        <p className="text-sm">
          Built with Next.js 15, Expo 52, and powered by crypto x AI 🚀
        </p>
      </div>
    </div>
  );
}
