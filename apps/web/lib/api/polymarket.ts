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

export interface OrderBook {
  market: string;
  asset_id: string;
  bids: Array<{ price: string; size: string }>;
  asks: Array<{ price: string; size: string }>;
  timestamp: string;
}

export interface PriceHistory {
  market: string;
  prices: Array<{
    t: number;
    p: number;
  }>;
}

export interface Position {
  market: string;
  outcome: string;
  size: number;
  avgPrice: number;
  currentValue: number;
  pnl: number;
  pnlPercent: number;
}

export interface Trade {
  id: string;
  market: string;
  side: "buy" | "sell";
  price: number;
  size: number;
  timestamp: number;
  status: string;
}

export interface PortfolioValue {
  totalValue: number;
  positions: number;
  markets: number;
}

class PolymarketAPI {
  private baseUrl = "https://gamma-api.polymarket.com";
  private cliBaseUrl = "/api/polymarket";

  // ==================== GAMMA API (Direct) ====================

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

  // ==================== CLI API (Via Next.js Routes) ====================

  async getMarketsViaCli(options: {
    limit?: number;
    offset?: number;
    active?: boolean;
  } = {}): Promise<any[]> {
    const params = new URLSearchParams();
    if (options.limit) params.set("limit", String(options.limit));
    if (options.offset) params.set("offset", String(options.offset));
    if (options.active !== undefined) params.set("active", String(options.active));
    
    const response = await axios.get(`${this.cliBaseUrl}/markets?${params}`);
    return response.data;
  }

  async getEvents(options: {
    limit?: number;
    tag?: string;
    active?: boolean;
  } = {}): Promise<any[]> {
    const params = new URLSearchParams();
    if (options.limit) params.set("limit", String(options.limit));
    if (options.tag) params.set("tag", options.tag);
    if (options.active !== undefined) params.set("active", String(options.active));
    
    const response = await axios.get(`${this.cliBaseUrl}/events?${params}`);
    return response.data;
  }

  async getTags(): Promise<any[]> {
    const response = await axios.get(`${this.cliBaseUrl}/tags`);
    return response.data;
  }

  // ==================== ORDER BOOK & PRICES ====================

  async getOrderBook(tokenId: string): Promise<OrderBook> {
    const response = await axios.get(`${this.cliBaseUrl}/clob/book/${tokenId}`);
    return response.data;
  }

  async getPrice(tokenId: string, side: "buy" | "sell" = "buy"): Promise<any> {
    const response = await axios.get(
      `${this.cliBaseUrl}/clob/price/${tokenId}?side=${side}`
    );
    return response.data;
  }

  async getMidpoint(tokenId: string): Promise<any> {
    const response = await axios.get(`${this.cliBaseUrl}/clob/midpoint/${tokenId}`);
    return response.data;
  }

  async getSpread(tokenId: string): Promise<any> {
    const response = await axios.get(`${this.cliBaseUrl}/clob/spread/${tokenId}`);
    return response.data;
  }

  async getPriceHistory(
    tokenId: string,
    interval: "1m" | "1h" | "6h" | "1d" | "1w" | "max" = "1d",
    fidelity: number = 30
  ): Promise<PriceHistory> {
    const response = await axios.get(
      `${this.cliBaseUrl}/clob/price-history/${tokenId}?interval=${interval}&fidelity=${fidelity}`
    );
    return response.data;
  }

  async getLastTrade(tokenId: string): Promise<any> {
    const response = await axios.get(`${this.cliBaseUrl}/clob/last-trade/${tokenId}`);
    return response.data;
  }

  // ==================== TRADING ====================

  async createOrder(options: {
    tokenId: string;
    side: "buy" | "sell";
    price: number;
    size: number;
    orderType?: "GTC" | "FOK" | "GTD" | "FAK";
    postOnly?: boolean;
  }): Promise<any> {
    const response = await axios.post(`${this.cliBaseUrl}/clob/create-order`, options);
    return response.data;
  }

  async createMarketOrder(options: {
    tokenId: string;
    side: "buy" | "sell";
    amount: number;
  }): Promise<any> {
    const response = await axios.post(`${this.cliBaseUrl}/clob/market-order`, options);
    return response.data;
  }

  async cancelOrder(orderId: string): Promise<any> {
    const response = await axios.post(`${this.cliBaseUrl}/clob/cancel`, { orderId });
    return response.data;
  }

  async cancelAllOrders(): Promise<any> {
    const response = await axios.post(`${this.cliBaseUrl}/clob/cancel-all`, {});
    return response.data;
  }

  async getOrders(marketConditionId?: string): Promise<Trade[]> {
    const params = marketConditionId ? `?market=${marketConditionId}` : "";
    const response = await axios.get(`${this.cliBaseUrl}/clob/orders${params}`);
    return response.data;
  }

  async getTrades(): Promise<Trade[]> {
    const response = await axios.get(`${this.cliBaseUrl}/clob/trades`);
    return response.data;
  }

  async getBalance(
    assetType: "collateral" | "conditional" = "collateral",
    tokenId?: string
  ): Promise<any> {
    const params = new URLSearchParams();
    params.set("assetType", assetType);
    if (tokenId) params.set("token", tokenId);
    
    const response = await axios.get(`${this.cliBaseUrl}/clob/balance?${params}`);
    return response.data;
  }

  // ==================== PORTFOLIO ====================

  async getPositions(address: string): Promise<Position[]> {
    const response = await axios.get(`${this.cliBaseUrl}/data/positions/${address}`);
    return response.data;
  }

  async getClosedPositions(address: string): Promise<Position[]> {
    const response = await axios.get(`${this.cliBaseUrl}/data/closed-positions/${address}`);
    return response.data;
  }

  async getPortfolioValue(address: string): Promise<PortfolioValue> {
    const response = await axios.get(`${this.cliBaseUrl}/data/value/${address}`);
    return response.data;
  }

  async getTradeHistory(address: string, limit: number = 50): Promise<Trade[]> {
    const response = await axios.get(
      `${this.cliBaseUrl}/data/trades/${address}?limit=${limit}`
    );
    return response.data;
  }

  async getActivity(address: string): Promise<any[]> {
    const response = await axios.get(`${this.cliBaseUrl}/data/activity/${address}`);
    return response.data;
  }

  // ==================== LEADERBOARD ====================

  async getLeaderboard(options: {
    period?: "day" | "week" | "month" | "all";
    orderBy?: "pnl" | "volume";
    limit?: number;
  } = {}): Promise<any[]> {
    const params = new URLSearchParams();
    if (options.period) params.set("period", options.period);
    if (options.orderBy) params.set("orderBy", options.orderBy);
    if (options.limit) params.set("limit", String(options.limit));
    
    const response = await axios.get(`${this.cliBaseUrl}/data/leaderboard?${params}`);
    return response.data;
  }

  // ==================== WALLET ====================

  async getWalletInfo(): Promise<any> {
    const response = await axios.get(`${this.cliBaseUrl}/wallet/show`);
    return response.data;
  }

  async createWallet(): Promise<any> {
    const response = await axios.post(`${this.cliBaseUrl}/wallet/create`, {});
    return response.data;
  }

  // ==================== SYSTEM ====================

  async checkApiHealth(): Promise<any> {
    const response = await axios.get(`${this.cliBaseUrl}/clob/ok`);
    return response.data;
  }

  async getStatus(): Promise<any> {
    const response = await axios.get(`${this.cliBaseUrl}/status`);
    return response.data;
  }
}

export const polymarketAPI = new PolymarketAPI();
