import { create } from "zustand";
import axios from "axios";

export interface CoingeckoMarket {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
}

interface MarketsStore {
  markets: CoingeckoMarket[];
  loading: boolean;
  error: string | null;
  lastUpdated: number | null;
  fetchTopMarkets: () => Promise<void>;
}

export const useMarketsStore = create<MarketsStore>((set) => ({
  markets: [],
  loading: false,
  error: null,
  lastUpdated: null,

  fetchTopMarkets: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&locale=en"
      );
      set({
        markets: response.data,
        loading: false,
        lastUpdated: Date.now(),
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to fetch markets",
        loading: false,
      });
    }
  },
}));
