import axios from "axios";

export interface PolymarketMarket {
  id: string;
  question: string;
  description?: string;
  creationTime: number;
  startTime?: number;
  endTime?: number;
  lastTradePrice?: number;
  lastTradeTime?: number;
  outcomes: string[];
  outcomeAmounts?: number[];
  outcomeComputedAmounts?: number[];
  volume?: number;
  volumeNum?: number;
  isResolved?: boolean;
  resolutionDescription?: string;
  resolutionSource?: string;
  tokenId?: string;
  liquidityNum?: number;
  umid?: string;
  imageUrl?: string;
  icon?: string;
  active?: boolean;
}

class PolymarketAPI {
  private baseUrl = "https://gamma-api.polymarket.com";

  async getMarkets(
    limit: number = 100,
    offset: number = 0,
  ): Promise<PolymarketMarket[]> {
    try {
      const response = await axios.get(`${this.baseUrl}/markets`, {
        params: {
          limit,
          offset,
          active: true,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching Polymarket markets:", error);
      throw error;
    }
  }

  async getMarketById(marketId: string): Promise<PolymarketMarket> {
    try {
      const response = await axios.get(`${this.baseUrl}/markets/${marketId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching Polymarket market:", error);
      throw error;
    }
  }

  async searchMarkets(keyword: string): Promise<PolymarketMarket[]> {
    try {
      const response = await axios.get(`${this.baseUrl}/markets`, {
        params: {
          search_term: keyword,
          limit: 50,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error searching Polymarket markets:", error);
      throw error;
    }
  }
}

export const polymarketAPI = new PolymarketAPI();
