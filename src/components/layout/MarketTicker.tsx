"use client";

import { useCallback, useEffect, useState } from "react";

type MarketData = {
  name: string;
  value: number;
  change: number;
  changePercent: number;
};

export default function MarketTicker() {
  const [markets, setMarkets] = useState<MarketData[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMarketData = useCallback(async () => {
    try {
      const response = await fetch("/api/market", {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch market data");
      }

      const result = await response.json();

      if (result.success && Array.isArray(result.data)) {
        setMarkets(result.data);
      }
    } catch (error) {
      console.error("Market ticker error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMarketData();

    // Refresh every 60 seconds
    const interval = setInterval(fetchMarketData, 60_000);

    return () => clearInterval(interval);
  }, [fetchMarketData]);

  if (loading || markets.length === 0) {
    return null;
  }

  return (
    <>
      {markets.map((market, index) => {
        const isPositive = market.change >= 0;

        return (
          <div
            key={market.name}
            className="hidden md:flex items-center gap-1.5 whitespace-nowrap"
          >
            <span className="font-semibold text-white/90">{market.name}</span>

            <span
              className={`font-medium ${
                isPositive ? "text-emerald-400" : "text-red-400"
              }`}
            >
              {isPositive ? "↑" : "↓"} ₹
              {market.value.toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
              <span className="text-[11px] ml-1">
                ({isPositive ? "+" : ""}
                {market.changePercent.toFixed(2)}%)
              </span>
            </span>

            {index === 0 && (
              <span className="hidden xl:inline text-white/25 ml-3">|</span>
            )}
          </div>
        );
      })}
    </>
  );
}
