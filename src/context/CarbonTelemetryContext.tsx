"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";

export interface CarbonMetricItem {
  id: number;
  asset_tag: string; // e.g., 'UBHP_HYDRO' | 'PBPL_ETHANOL'
  metric_name: string;
  unit: string;
  current_calculated_value: number;
  liveValue: number;
  animation_params: {
    rate_per_second: number;
    base_timestamp_utc: string;
    base_value: number;
  };
}

interface CarbonTelemetryContextValue {
  metrics: Record<string, CarbonMetricItem>;
  hydroMetric: CarbonMetricItem;
  ethanolMetric: CarbonMetricItem;
  totalCarbonOffset: number;
  totalRatePerSecond: number;
  isLoading: boolean;
  lastSyncedAt: string | null;
  refreshTelemetry: () => Promise<void>;
  formatMetric: (val: number, decimals?: number) => string;
}

// Instant initial fallback so UI never flashes 0 while fetching
const DEFAULT_HYDRO: CarbonMetricItem = {
  id: 1,
  asset_tag: "UBHP_HYDRO",
  metric_name: "Cumulative CO₂ Displaced (Sarju Hydro Cascade)",
  unit: "MT CO₂",
  current_calculated_value: 217800,
  liveValue: 217800,
  animation_params: {
    rate_per_second: 0.00231481,
    base_timestamp_utc: "2026-11-01T00:00:00Z",
    base_value: 217800,
  },
};

const DEFAULT_ETHANOL: CarbonMetricItem = {
  id: 2,
  asset_tag: "PBPL_ETHANOL",
  metric_name: "Cumulative Carbon Displacement (250 KLPD Bio-Refinery)",
  unit: "MT CO₂",
  current_calculated_value: 42500,
  liveValue: 42500,
  animation_params: {
    rate_per_second: 0.00694444,
    base_timestamp_utc: "2026-11-01T00:00:00Z",
    base_value: 42500,
  },
};

const CarbonTelemetryContext = createContext<
  CarbonTelemetryContextValue | undefined
>(undefined);

export function CarbonTelemetryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [metrics, setMetrics] = useState<Record<string, CarbonMetricItem>>({
    UBHP_HYDRO: DEFAULT_HYDRO,
    PBPL_ETHANOL: DEFAULT_ETHANOL,
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [lastSyncedAt, setLastSyncedAt] = useState<string | null>(null);
  // Track clock offset between user's browser and Hostinger server
  const [serverOffsetMs, setServerOffsetMs] = useState<number>(0);

  const refreshTelemetry = useCallback(async () => {
    try {
      const apiBase =
        process.env.NEXT_PUBLIC_ADMIN_API_URL ||
        "https://aliceblue-yak-580540.hostingersite.com/pingaksh-admin";

      const res = await fetch(`${apiBase}/api/carbon.php`, {
        cache: "no-store",
      });

      const json = await res.json();

      if (json.success && Array.isArray(json.data)) {
        if (json.server_time) {
          setLastSyncedAt(json.server_time);
        }

        const mapped: Record<string, CarbonMetricItem> = {};

        json.data.forEach((item: Omit<CarbonMetricItem, "liveValue">) => {
          mapped[item.asset_tag] = {
            ...item,
            liveValue: Number(item.current_calculated_value),
          };
        });

        setMetrics((prev) => ({
          ...prev,
          ...mapped,
        }));
      }
    } catch (err) {
      console.error("Failed to fetch carbon telemetry:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 1. Initial Fetch + Periodic Re-sync every 60s
  // Fetch telemetry only once when the page loads
  useEffect(() => {
    refreshTelemetry();
  }, [refreshTelemetry]);
  // 2. Smooth 100ms Real-Time Mathematical Ticker

  const hydroMetric = metrics["UBHP_HYDRO"] || DEFAULT_HYDRO;
  const ethanolMetric = metrics["PBPL_ETHANOL"] || DEFAULT_ETHANOL;

  const { totalCarbonOffset, totalRatePerSecond } = useMemo(() => {
    const all = Object.values(metrics);
    return {
      totalCarbonOffset: all.reduce((sum, item) => sum + item.liveValue, 0),
      totalRatePerSecond: all.reduce(
        (sum, item) => sum + item.animation_params.rate_per_second,
        0,
      ),
    };
  }, [metrics]);

  const formatMetric = useCallback((val: number, decimals = 2) => {
    return val.toLocaleString("en-IN", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  }, []);

  return (
    <CarbonTelemetryContext.Provider
      value={{
        metrics,
        hydroMetric,
        ethanolMetric,
        totalCarbonOffset,
        totalRatePerSecond,
        isLoading,
        lastSyncedAt,
        refreshTelemetry,
        formatMetric,
      }}
    >
      {children}
    </CarbonTelemetryContext.Provider>
  );
}

export function useCarbonTelemetry() {
  const context = useContext(CarbonTelemetryContext);
  if (!context) {
    throw new Error(
      "useCarbonTelemetry must be used within a CarbonTelemetryProvider",
    );
  }
  return context;
}
