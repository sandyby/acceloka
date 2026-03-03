"use client";

import { Slider } from "@mui/material";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useTicketMetadata } from "@/contexts/TicketMetadataContext";
import StyledTypography from "../ui/StyledTypography";
import { useEffect, useState } from "react";
import { isError } from "@tanstack/react-query";

export default function Filters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { data: metadata, isFetching, isError, refetch } = useTicketMetadata();

  const [localMaxPrice, setLocalMaxPrice] = useState<number>(0);
  const [localAirline, setLocalAirline] = useState<string | undefined>();

  useEffect(() => {
    const maxPriceParam = searchParams.get("maxprice");
    const airlineParam = searchParams.get("airline");

    setLocalMaxPrice(maxPriceParam ? Number(maxPriceParam) : metadata?.maxPrice ?? 0);
    setLocalAirline(airlineParam ?? undefined);
  }, [searchParams, metadata]);

  function applyFilters() {
    const params = new URLSearchParams(searchParams.toString());

    params.set("page", "1");

    params.set("maxprice", String(localMaxPrice));

    if (localAirline) params.set("airline", localAirline);
    else params.delete("airline");

    router.push(`?${params.toString()}`);
  }

  return (
    <>
      {isFetching && !metadata && (<p>Loading...</p>)}
      {!isFetching && isError && (
        <div className="flex flex-col items-center justify-center h-full text-center p-6">
          <StyledTypography fontSizeInput={28} sx={{ color: 'var(--color-red-500)' }} fontWeightInput="bold">
            {`Oops!`}
          </StyledTypography>
          <StyledTypography fontSizeInput={14} sx={{ marginTop: 2, marginBottom: 2, color: 'var(--color-accent-primary-900)' }}>
            {"The server might be down or taking too long. Please try again later!"}
          </StyledTypography>

          <button
            onClick={() => refetch()}
            className="px-2.5 py-1 bg-primary-500 text-md text-white rounded-lg hover:bg-primary-600 transition"
          >
            Reload Filters
          </button>

          <p className="mt-4 text-sm text-accent-primary-900">
            or refresh the page if the problem continues
          </p>
        </div>
      )}
      {
        !isFetching && metadata && (
          <>
            <StyledTypography fontSizeInput={16} fontWeightInput="bold">
              Max Price
            </StyledTypography>

            <Slider
              value={localMaxPrice}
              onChange={(_, v) => setLocalMaxPrice(v as number)}
              min={0}
              max={metadata.maxPrice}
              step={50000}
              valueLabelDisplay="auto"
            />

            <select
              value={localAirline ?? ""}
              onChange={(e) => setLocalAirline(e.target.value || undefined)}
              className="border p-2 rounded w-full text-primary-500"
            >
              <option value="">All Airlines</option>
              {metadata.airlines.map((airline) => (
                <option key={airline} value={airline} className="hover-bg-primary-50">
                  {airline}
                </option>
              ))}
            </select>

            <button
              onClick={applyFilters}
              className="mt-4 bg-primary-500 text-white px-4 py-2 rounded"
            >
              Apply Filters
            </button>
          </>
        )
      }
    </>
  );
}