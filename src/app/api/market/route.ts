import { NextResponse } from "next/server";

type MarketData = {
  name: string;
  value: number;
  change: number;
  changePercent: number;
};

// Helper function to fetch individual index data using the more permissive v8 Chart API
async function fetchIndexData(
  symbol: string,
  name: string,
): Promise<MarketData | null> {
  try {
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?region=IN&lang=en-IN&includePrePost=false&interval=1d&useYfid=true&range=1d`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        // A modern User-Agent is REQUIRED to bypass Yahoo's 401/429 bot protections
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
        Accept: "application/json",
      },
      // Cache for 60 seconds (ISR) to absorb traffic and prevent rate limits
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      console.warn(
        `Yahoo Finance v8 API failed for ${symbol} with status ${response.status}`,
      );
      return null;
    }

    const data = await response.json();
    const result = data?.chart?.result?.[0];

    if (!result) return null;

    // Calculate changes based on current market price vs previous close
    const meta = result.meta;
    const value = meta.regularMarketPrice;
    const previousClose = meta.chartPreviousClose;
    const change = value - previousClose;
    const changePercent = (change / previousClose) * 100;

    return {
      name,
      value: Number(value.toFixed(2)),
      change: Number(change.toFixed(2)),
      changePercent: Number(changePercent.toFixed(2)),
    };
  } catch (error) {
    console.error(`Error fetching ${name}:`, error);
    return null;
  }
}

export async function GET() {
  try {
    // Fetch NIFTY and SENSEX concurrently
    const [nifty, sensex] = await Promise.all([
      fetchIndexData("^NSEI", "NIFTY 50"),
      fetchIndexData("^BSESN", "SENSEX"),
    ]);

    const markets = [nifty, sensex].filter(Boolean) as MarketData[];

    if (markets.length === 0) {
      throw new Error("Failed to fetch both indices from Yahoo Finance");
    }

    return NextResponse.json({
      success: true,
      data: markets,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Market API error:", error);

    // GRACEFUL FALLBACK: If Yahoo totally blocks the request, return static mock data
    // with a 200 status so the frontend UI doesn't break or show a red error.
    return NextResponse.json(
      {
        success: false,
        data: [
          { name: "NIFTY 50", value: 24500.0, change: 0, changePercent: 0 },
          { name: "SENSEX", value: 80500.0, change: 0, changePercent: 0 },
        ],
        error: "Using fallback market data due to API block",
      },
      { status: 200 },
    );
  }
}
