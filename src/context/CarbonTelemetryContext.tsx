"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

interface CarbonWorkbookData {
  // Yellow Showcase Field 1 (For Hydro Page)
  hydroEnergyGeneratedGwh: number;
  // Yellow Showcase Field 2 (Total Group Carbon Saved)
  totalCarbonSavedTonnes: number;
  // Detailed Breakdown
  ethanolSalesLitres: number;
  ethanolCarbonSavedTonnes: number;
  sarju3Kwh: number;
  sarju2Kwh: number;
  totalHydroKwh: number;
  hydroCarbonSavedTonnes: number;
  isLoading: boolean;
  formatIndianNumber: (val: number, decimals?: number) => string;
}

const DEFAULT_DATA: Omit<
  CarbonWorkbookData,
  "isLoading" | "formatIndianNumber"
> = {
  hydroEnergyGeneratedGwh: 598.76,
  totalCarbonSavedTonnes: 677802.01,
  ethanolSalesLitres: 117595000,
  ethanolCarbonSavedTonnes: 97603.85,
  sarju3Kwh: 280687531.95,
  sarju2Kwh: 318072180,
  totalHydroKwh: 598759711.95,
  hydroCarbonSavedTonnes: 580198.16,
};

const CarbonTelemetryContext = createContext<CarbonWorkbookData | undefined>(
  undefined,
);

export function CarbonTelemetryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [data, setData] = useState(DEFAULT_DATA);
  const [isLoading, setIsLoading] = useState(true);

  const fetchWorkbook = useCallback(async () => {
    try {
      const apiBase =
        process.env.NEXT_PUBLIC_ADMIN_API_URL ||
        "https://aliceblue-yak-580540.hostingersite.com/pingaksh-admin";

      const res = await fetch(`${apiBase}/api/carbon.php`, {
        cache: "no-store",
      });
      const json = await res.json();

      if (json.success && json.breakdown) {
        setData({
          hydroEnergyGeneratedGwh:
            json.showcase_yellow_fields.hydro_energy_generated_gwh_exact,
          totalCarbonSavedTonnes:
            json.showcase_yellow_fields.total_carbon_saved_tonnes_exact,
          ethanolSalesLitres: json.breakdown.ethanol.sales_to_date_litres,
          ethanolCarbonSavedTonnes:
            json.breakdown.ethanol.tailpipe_carbon_saved_tonnes,
          sarju3Kwh: json.breakdown.hydro.sarju_3_kwh,
          sarju2Kwh: json.breakdown.hydro.sarju_2_kwh,
          totalHydroKwh: json.breakdown.hydro.total_units_kwh,
          hydroCarbonSavedTonnes:
            json.breakdown.hydro.hydro_carbon_saved_tonnes,
        });
      }
    } catch (err) {
      console.error("Failed to fetch carbon workbook API:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWorkbook();
  }, [fetchWorkbook]);

  const formatIndianNumber = useCallback((val: number, decimals = 2) => {
    return val.toLocaleString("en-IN", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  }, []);

  return (
    <CarbonTelemetryContext.Provider
      value={{
        ...data,
        isLoading,
        formatIndianNumber,
      }}
    >
      {children}
    </CarbonTelemetryContext.Provider>
  );
}

export function useCarbonTelemetry() {
  const ctx = useContext(CarbonTelemetryContext);
  if (!ctx) {
    throw new Error(
      "useCarbonTelemetry must be used within CarbonTelemetryProvider",
    );
  }
  return ctx;
}
