import { NextResponse } from "next/server";

type MarketData = {
  name: string;
  value: number;
  change: number;
  changePercent: number;
};

type IndianApiIndex = {
  name: string;
  price: string | number;
  percentChange: string | number;
  netChange: string | number;
  tickerId?: string;
  exchangeType?: string;
  date?: string;
  time?: string;
};

type IndianApiResponse = {
  indices: IndianApiIndex[];
};

const API_URL = "https://stock.indianapi.in/indices";

export async function GET() {
  try {
    const apiKey = process.env.INDIAN_API_KEY;

    if (!apiKey) {
      console.error("INDIAN_API_KEY is missing");

      return NextResponse.json(
        {
          success: false,
          data: [],
          error: "Market API key is not configured",
        },
        { status: 500 },
      );
    }

    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        "X-API-Key": apiKey,
        Accept: "application/json",
      },

      // Don't use Next.js cached market data
      cache: "no-store",
    });

    if (!response.ok) {
      const errorText = await response.text();

      console.error("IndianAPI error:", response.status, errorText);

      throw new Error(
        `IndianAPI request failed with status ${response.status}`,
      );
    }

    const result: IndianApiResponse = await response.json();

    if (!result?.indices || !Array.isArray(result.indices)) {
      throw new Error("Invalid response from IndianAPI");
    }

    // Only show the two indices required for your navbar
    const requiredIndices = ["NIFTY 50", "SENSEX"];

    const markets: MarketData[] = result.indices
      .filter((index) => requiredIndices.includes(index.name))
      .map((index) => ({
        name: index.name,
        value: Number(index.price),
        change: Number(index.netChange),
        changePercent: Number(index.percentChange),
      }));

    // Keep the order consistent
    const orderedMarkets = requiredIndices
      .map((name) => markets.find((market) => market.name === name))
      .filter((market): market is MarketData => Boolean(market));

    return NextResponse.json(
      {
        success: true,
        data: orderedMarkets,
        updatedAt: new Date().toISOString(),
      },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  } catch (error) {
    console.error("Market API error:", error);

    return NextResponse.json(
      {
        success: false,
        data: [],
        error: "Unable to fetch market data",
      },
      {
        status: 500,
      },
    );
  }
}
