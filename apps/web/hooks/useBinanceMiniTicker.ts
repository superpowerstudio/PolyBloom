"use client";

import { useEffect, useMemo, useRef, useState } from "react";

export interface BinanceMiniTicker {
  e: string; // event type
  E: number; // event time
  s: string; // symbol
  c: string; // close price
  o: string; // open price
  h: string; // high price
  l: string; // low price
  v: string; // total traded base asset volume
  q: string; // total traded quote asset volume
}

export function useBinanceMiniTicker(symbols: string[]) {
  const [tickers, setTickers] = useState<Record<string, BinanceMiniTicker>>({});
  const wsRef = useRef<WebSocket | null>(null);

  const normalized = useMemo(
    () => symbols.map((s) => s.toUpperCase()).filter(Boolean),
    [symbols],
  );

  useEffect(() => {
    if (normalized.length === 0) return;

    const ws = new WebSocket(
      "wss://stream.binance.com:9443/ws/!miniTicker@arr",
    );
    wsRef.current = ws;

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data) as BinanceMiniTicker[];
        if (!Array.isArray(data)) return;

        const updates: Record<string, BinanceMiniTicker> = {};
        for (const tick of data) {
          if (normalized.includes(tick.s)) {
            updates[tick.s] = tick;
          }
        }

        if (Object.keys(updates).length > 0) {
          setTickers((prev) => ({ ...prev, ...updates }));
        }
      } catch {
        // ignore parse errors
      }
    };

    ws.onclose = () => {
      // Attempt simple reconnect
      setTimeout(() => {
        if (wsRef.current?.readyState !== WebSocket.OPEN) {
          wsRef.current = null;
        }
      }, 5000);
    };

    return () => {
      ws.close();
    };
  }, [normalized.join(",")]);

  return tickers;
}
