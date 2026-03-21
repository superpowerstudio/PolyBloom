import { NextRequest, NextResponse } from "next/server";
import { polymarketCli } from "@/lib/services/polymarketCliService";

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  const path = params.path;
  const searchParams = request.nextUrl.searchParams;

  try {
    let result;

    switch (path[0]) {
      case "markets":
        if (path[1] === "search") {
          const keyword = searchParams.get("keyword") || "";
          const limit = parseInt(searchParams.get("limit") || "50");
          result = await polymarketCli.searchMarkets(keyword, limit);
        } else if (path[1] && path[1] !== "list") {
          result = await polymarketCli.getMarketById(path[1]);
        } else {
          result = await polymarketCli.getMarkets({
            limit: parseInt(searchParams.get("limit") || "100"),
            offset: parseInt(searchParams.get("offset") || "0"),
            active: searchParams.get("active") === "true" ? true : undefined,
            closed: searchParams.get("closed") === "true" ? true : undefined,
            order: searchParams.get("order") || undefined,
            ascending: searchParams.get("ascending") === "true",
          });
        }
        break;

      case "events":
        if (path[1] && path[1] !== "list") {
          result = await polymarketCli.getEventById(path[1]);
        } else {
          result = await polymarketCli.getEvents({
            limit: parseInt(searchParams.get("limit") || "100"),
            offset: parseInt(searchParams.get("offset") || "0"),
            tag: searchParams.get("tag") || undefined,
            active: searchParams.get("active") === "true" ? true : undefined,
            closed: searchParams.get("closed") === "true" ? true : undefined,
          });
        }
        break;

      case "tags":
        if (path[1]) {
          result = await polymarketCli.getTag(path[1]);
        } else {
          result = await polymarketCli.getTags();
        }
        break;

      case "clob":
        switch (path[1]) {
          case "ok":
            result = await polymarketCli.checkApiHealth();
            break;
          case "price":
            result = await polymarketCli.getPrice(
              path[2],
              (searchParams.get("side") as "buy" | "sell") || "buy"
            );
            break;
          case "midpoint":
            result = await polymarketCli.getMidpoint(path[2]);
            break;
          case "spread":
            result = await polymarketCli.getSpread(path[2]);
            break;
          case "book":
            result = await polymarketCli.getOrderBook(path[2]);
            break;
          case "last-trade":
            result = await polymarketCli.getLastTrade(path[2]);
            break;
          case "market":
            result = await polymarketCli.getClobMarket(path[2]);
            break;
          case "markets":
            result = await polymarketCli.getClobMarkets();
            break;
          case "price-history":
            result = await polymarketCli.getPriceHistory(
              path[2],
              (searchParams.get("interval") as any) || "1d",
              parseInt(searchParams.get("fidelity") || "30")
            );
            break;
          case "tick-size":
            result = await polymarketCli.getTickSize(path[2]);
            break;
          case "fee-rate":
            result = await polymarketCli.getFeeRate(path[2]);
            break;
          case "neg-risk":
            result = await polymarketCli.getNegRisk(path[2]);
            break;
          case "time":
            result = await polymarketCli.getClobTime();
            break;
          case "geoblock":
            result = await polymarketCli.checkGeoblock();
            break;
          case "orders":
            result = await polymarketCli.getOrders(path[2]);
            break;
          case "trades":
            result = await polymarketCli.getTrades();
            break;
          case "balance":
            result = await polymarketCli.getBalance(
              (searchParams.get("assetType") as "collateral" | "conditional") || "collateral",
              searchParams.get("token") || undefined
            );
            break;
          case "rewards":
            result = await polymarketCli.getRewards(searchParams.get("date") || undefined);
            break;
          case "earnings":
            result = await polymarketCli.getEarnings(searchParams.get("date") || undefined);
            break;
          case "api-keys":
            result = await polymarketCli.getApiKeys();
            break;
          case "account-status":
            result = await polymarketCli.getAccountStatus();
            break;
          default:
            return NextResponse.json(
              { error: `Unknown CLOB endpoint: ${path[1]}` },
              { status: 404 }
            );
        }
        break;

      case "data":
        switch (path[1]) {
          case "positions":
            result = await polymarketCli.getPositions(path[2]);
            break;
          case "closed-positions":
            result = await polymarketCli.getClosedPositions(path[2]);
            break;
          case "value":
            result = await polymarketCli.getPortfolioValue(path[2]);
            break;
          case "traded":
            result = await polymarketCli.getTradedMarkets(path[2]);
            break;
          case "trades":
            result = await polymarketCli.getTradeHistory(
              path[2],
              parseInt(searchParams.get("limit") || "50")
            );
            break;
          case "activity":
            result = await polymarketCli.getActivity(path[2]);
            break;
          case "holders":
            result = await polymarketCli.getHolders(path[2]);
            break;
          case "open-interest":
            result = await polymarketCli.getOpenInterest(path[2]);
            break;
          case "volume":
            result = await polymarketCli.getVolume(path[2]);
            break;
          case "leaderboard":
            result = await polymarketCli.getLeaderboard({
              period: (searchParams.get("period") as any) || undefined,
              orderBy: (searchParams.get("orderBy") as any) || undefined,
              limit: parseInt(searchParams.get("limit") || "10"),
            });
            break;
          default:
            return NextResponse.json(
              { error: `Unknown data endpoint: ${path[1]}` },
              { status: 404 }
            );
        }
        break;

      case "wallet":
        switch (path[1]) {
          case "address":
            result = await polymarketCli.getWalletAddress();
            break;
          case "show":
            result = await polymarketCli.getWalletInfo();
            break;
          default:
            return NextResponse.json(
              { error: `Unknown wallet endpoint: ${path[1]}` },
              { status: 404 }
            );
        }
        break;

      case "approve":
        switch (path[1]) {
          case "check":
            result = await polymarketCli.checkApprovals(path[2]);
            break;
          default:
            return NextResponse.json(
              { error: `Unknown approve endpoint: ${path[1]}` },
              { status: 404 }
            );
        }
        break;

      case "profiles":
        if (path[1] === "get" && path[2]) {
          result = await polymarketCli.getProfile(path[2]);
        } else {
          return NextResponse.json(
            { error: "Profile address required" },
            { status: 400 }
          );
        }
        break;

      case "sports":
        switch (path[1]) {
          case "list":
            result = await polymarketCli.getSports();
            break;
          case "market-types":
            result = await polymarketCli.getSportsMarketTypes();
            break;
          case "teams":
            result = await polymarketCli.getSportsTeams(
              searchParams.get("league") || undefined,
              parseInt(searchParams.get("limit") || "50")
            );
            break;
          default:
            return NextResponse.json(
              { error: `Unknown sports endpoint: ${path[1]}` },
              { status: 404 }
            );
        }
        break;

      case "bridge":
        switch (path[1]) {
          case "deposit":
            result = await polymarketCli.getDepositAddresses(path[2]);
            break;
          case "supported-assets":
            result = await polymarketCli.getSupportedAssets();
            break;
          case "status":
            result = await polymarketCli.checkDepositStatus(path[2]);
            break;
          default:
            return NextResponse.json(
              { error: `Unknown bridge endpoint: ${path[1]}` },
              { status: 404 }
            );
        }
        break;

      case "status":
        result = await polymarketCli.getStatus();
        break;

      default:
        return NextResponse.json(
          { error: `Unknown endpoint: ${path[0]}` },
          { status: 404 }
        );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Polymarket API error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  const path = params.path;

  try {
    const body = await request.json();
    let result;

    switch (path[0]) {
      case "clob":
        switch (path[1]) {
          case "create-order":
            result = await polymarketCli.createOrder(body);
            break;
          case "market-order":
            result = await polymarketCli.createMarketOrder(body);
            break;
          case "post-orders":
            result = await polymarketCli.postOrders(body);
            break;
          case "cancel":
            result = await polymarketCli.cancelOrder(body.orderId);
            break;
          case "cancel-orders":
            result = await polymarketCli.cancelOrders(body.orderIds);
            break;
          case "cancel-market":
            result = await polymarketCli.cancelMarketOrders(body.conditionId);
            break;
          case "cancel-all":
            result = await polymarketCli.cancelAllOrders();
            break;
          case "create-api-key":
            result = await polymarketCli.createApiKey();
            break;
          case "delete-api-key":
            result = await polymarketCli.deleteApiKey();
            break;
          case "update-balance":
            result = await polymarketCli.updateBalance(body.assetType);
            break;
          default:
            return NextResponse.json(
              { error: `Unknown CLOB POST endpoint: ${path[1]}` },
              { status: 404 }
            );
        }
        break;

      case "wallet":
        switch (path[1]) {
          case "create":
            result = await polymarketCli.createWallet(body.force || false);
            break;
          case "import":
            result = await polymarketCli.importWallet(body.privateKey);
            break;
          case "reset":
            result = await polymarketCli.resetWallet(body.force || false);
            break;
          default:
            return NextResponse.json(
              { error: `Unknown wallet POST endpoint: ${path[1]}` },
              { status: 404 }
            );
        }
        break;

      case "approve":
        switch (path[1]) {
          case "set":
            result = await polymarketCli.setApprovals();
            break;
          default:
            return NextResponse.json(
              { error: `Unknown approve POST endpoint: ${path[1]}` },
              { status: 404 }
            );
        }
        break;

      case "ctf":
        switch (path[1]) {
          case "split":
            result = await polymarketCli.splitTokens(body.conditionId, body.amount);
            break;
          case "merge":
            result = await polymarketCli.mergeTokens(body.conditionId, body.amount);
            break;
          case "redeem":
            result = await polymarketCli.redeemTokens(body.conditionId);
            break;
          case "redeem-neg-risk":
            result = await polymarketCli.redeemNegRisk(body.conditionId, body.amounts);
            break;
          default:
            return NextResponse.json(
              { error: `Unknown CTF POST endpoint: ${path[1]}` },
              { status: 404 }
            );
        }
        break;

      default:
        return NextResponse.json(
          { error: `Unknown POST endpoint: ${path[0]}` },
          { status: 404 }
        );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Polymarket API error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}