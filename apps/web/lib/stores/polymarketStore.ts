import { create } from "zustand";
import { polymarketAPI, PolymarketMarket } from "@/lib/api/polymarket";

interface PolymarketStore {
  markets: PolymarketMarket[];
  loading: boolean;
  error: string | null;
  lastUpdated: number | null;
  fetchMarkets: (limit?: number) => Promise<void>;
  searchMarkets: (keyword: string) => Promise<void>;
}

export const usePolymarketStore = create<PolymarketStore>((set) => ({
  markets: [],
  loading: false,
  error: null,
  lastUpdated: null,

  fetchMarkets: async (limit = 50) => {
    set({ loading: true, error: null });
    try {
      const markets = await polymarketAPI.getMarkets(limit);
      set({
        markets,
        loading: false,
        lastUpdated: Date.now(),
      });
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch Polymarket markets",
        loading: false,
      });
    }
  },

  searchMarkets: async (keyword: string) => {
    set({ loading: true, error: null });
    try {
      const markets = await polymarketAPI.searchMarkets(keyword);
      set({
        markets,
        loading: false,
        lastUpdated: Date.now(),
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Search failed",
        loading: false,
      });
    }
  },
}));
