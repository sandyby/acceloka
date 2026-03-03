"use client";

import { Slider } from "@mui/material";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useTicketMetadata } from "@/contexts/TicketMetadataContext";
import StyledTypography from "../ui/StyledTypography";
import { useEffect, useState } from "react";
import { Select } from "thereactselect";
import DateInput from "../ui/DateInput";

export default function Filters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { data: metadata, isFetching, isError, refetch } = useTicketMetadata();

  const [localMaxPrice, setLocalMaxPrice] = useState<number>(0);
  const [localAirline, setLocalAirline] = useState<string | undefined>();
  const [localEarliestDeparture, setLocalEarliestDeparture] = useState<string | undefined>();
  const [localLatestDeparture, setLocalLatestDeparture] = useState<string | undefined>();
  const [localEarliestArrival, setLocalEarliestArrival] = useState<string | undefined>();
  const [localLatestArrival, setLocalLatestArrival] = useState<string | undefined>();

  useEffect(() => {
    const maxPriceParam = searchParams.get("maxprice");
    const airlineParam = searchParams.get("airline");
    const earliestDepartureParam = searchParams.get("mindeparture");
    const latestDepartureParam = searchParams.get("maxdeparture");
    const earliestArrivalParam = searchParams.get("minarrival");
    const latestArrivalParam = searchParams.get("maxarrival");

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLocalMaxPrice(maxPriceParam ? Number(maxPriceParam) : metadata?.maxPrice ?? 0);
    setLocalAirline(airlineParam ?? undefined);
    setLocalEarliestDeparture(earliestDepartureParam ?? undefined);
    setLocalLatestDeparture(latestDepartureParam ?? undefined);
    setLocalEarliestArrival(earliestArrivalParam ?? undefined);
    setLocalLatestArrival(latestArrivalParam ?? undefined);
  }, [searchParams, metadata]);

  function applyFilters() {
    const params = new URLSearchParams(searchParams.toString());

    params.set("page", "1");

    params.set("maxprice", String(localMaxPrice));

    if (localAirline) params.set("airline", localAirline);
    else params.delete("airline");

    if (localEarliestDeparture) params.set("mindeparture", localEarliestDeparture);
    else params.delete("mindeparture");
    if (localLatestDeparture) params.set("maxdeparture", localLatestDeparture);
    else params.delete("maxdeparture");
    if (localEarliestArrival) params.set("minarrival", localEarliestArrival);
    else params.delete("minarrival");
    if (localLatestArrival) params.set("maxarrival", localLatestArrival);
    else params.delete("maxarrival");

    router.push(`?${params.toString()}`);
  }

  // thereactselect punya
  // const airlineOptions = [
  //   { value: "", label: "All Airlines", description: "" },
  //   ...(metadata?.airlines.map(a => ({ value: a, label: a, description: "" })) || [])
  // ];

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
            <div>
              <div className="flex gap-x-2 items-center mb-2">
                <StyledTypography fontSizeInput={16} fontWeightInput="bold">
                  Max. Price
                </StyledTypography>
                <StyledTypography fontSizeInput={14} fontWeightInput="normal" sx={{ bgcolor: 'var(--color-primary-500)', color: 'var(--color-white-900)', paddingX: 1.5, paddingY: 0.5, borderRadius: 4 }}>
                  Rp {localMaxPrice.toLocaleString('id-ID')}
                </StyledTypography>
              </div>

              {/* // TODO: add (X) on the filter to reset maxprice and etc., if possible jg add/move "Active Filters" in the contents section to clarify between no tickets found by fetching and by filtering */}

              <Slider
                value={localMaxPrice}
                onChange={(_, v) => setLocalMaxPrice(v as number)}
                min={0}
                max={metadata.maxPrice}
                step={50000}
                valueLabelDisplay="auto"
              />
            </div>

            {/* // TODO: study thereactselect more about the styling and all/other components*/}
            {/* <Select
              className="text-secondary-900 bg-white-900"
              options={airlineOptions}
              placeholder="Select an airline"
              clearable
              scrollable
              maxHeight={100}
              onValueChange={(newAirline) => setLocalAirline(newAirline ? String(newAirline) : undefined)}
              value={localAirline}
            /> */}

            <div className="mb-2">
              <div className="mb-2">
                <StyledTypography fontSizeInput={16} fontWeightInput="bold">
                  Selected Airline
                </StyledTypography>
              </div>
              <select
                value={localAirline ?? ""}
                onChange={(e) => setLocalAirline(e.target.value || undefined)}
                className="border px-3 py-2 rounded-3xl w-full text-primary-500"
              >
                <option value="">All Airlines</option>
                {metadata.airlines.map((airline) => (
                  <option key={airline} value={airline} >
                    {airline}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-2">
              <DateInput
                label="Min. Departure Time"
                value={localEarliestDeparture}
                onChange={setLocalEarliestDeparture}
              />
            </div>

            <div className="mt-auto">
              <button
                onClick={applyFilters}
                className="mt-4 bg-primary-500 text-white px-4 py-2 rounded"
              >
                Apply Filters
              </button>
            </div>
          </>
        )
      }
    </>
  );
}