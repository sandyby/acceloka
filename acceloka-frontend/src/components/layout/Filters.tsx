"use client";

import { CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useTicketMetadata } from "@/contexts/TicketMetadataContext";
import StyledTypography from "@/components/ui/StyledTypography";
import { useEffect, useRef, useState } from "react";
import StyledFiltersSkeleton from "@/components/ui/skeletons/StyledFiltersSkeleton";
import DateTimeInput from "@/components/ui/DateTimeInput";
import { FilterSchema } from "@/lib/filters-schema";
import z from "zod";
import MultiSelectDropdown from "../ui/MultiSelectDropdown";
import { MaxPriceSlider, StyledSliderLabel } from "@/components/ui/StyledRangeSlider";
import MultiCheckboxGroup from "../ui/MultiCheckboxGroup";

export default function Filters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const filtersWrapperRef = useRef<HTMLDivElement>(null);

  const { data: metadata, isFetching, isError, refetch } = useTicketMetadata();
  const [isApplyingFilter, setIsApplyingFilter] = useState<boolean>(false);

  // * slider needs
  const MAX_PRICE = metadata?.maxPrice ?? 0;
  const MIN_PRICE = 0;
  const marks = [
    {
      value: MIN_PRICE,
      label: MIN_PRICE.toString(),
    },
    {
      value: MAX_PRICE,
      label: MAX_PRICE!.toString(),
    },
  ];

  // * clear all button needs (conditional)
  const hasActiveFilters = [
    "maxprice", "airlines", "amenities", "seatclasses", "mindeparture",
    "maxdeparture", "minarrival", "maxarrival"
  ].some(key => searchParams.has(key));

  const getInitialMaxPrice = () => {
    const param = searchParams.get("maxprice");
    if (param) {
      console.log("dbg gim 0: ", param);
      return Number(param);
    }
    console.log("dbg gim 1: ", metadata?.maxPrice);
    return metadata?.maxPrice ?? 0;
  };

  // * filters need
  // TODO: somehow make it polymorhpic to each ticket cards type
  const [localMaxPrice, setLocalMaxPrice] = useState<number>(getInitialMaxPrice());
  const [localAirlines, setLocalAirlines] = useState<string[]>([]);
  const [localAmenities, setLocalAmenities] = useState<string[]>([]);
  const [localSeatClasses, setLocalSeatClasses] = useState<string[]>([]);
  const [localMinDeparture, setLocalMinDeparture] = useState<string | undefined>();
  const [localMaxDeparture, setLocalMaxDeparture] = useState<string | undefined>();
  const [localMinArrival, setLocalMinArrival] = useState<string | undefined>();
  const [localMaxArrival, setLocalMaxArrival] = useState<string | undefined>();

  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});

  const validateLocal = () => {
    try {
      FilterSchema.parse({
        maxprice: localMaxPrice,
        airlines: localAirlines,
        seatclasses: localSeatClasses,
        amenities: localAmenities,
        mindeparture: localMinDeparture,
        maxdeparture: localMaxDeparture,
        minarrival: localMinArrival,
        maxarrival: localMaxArrival,
      });
      setValidationErrors({});
      return true;
    } catch (err) {
      if (err instanceof z.ZodError) {
        const newErrors: { [key: string]: string } = {};
        err.issues.forEach(issue => {
          const pathKey = issue.path[0];
          if (typeof pathKey === 'string') {
            newErrors[pathKey] = issue.message;
          }
        });
        console.log("dbg errors: ", newErrors);
        setValidationErrors(newErrors);
        return false;
      }
      setValidationErrors({});
      console.log("dbg success validate local");
      return true;
    }
  };

  // * for real-time like validating if local state changes
  useEffect(() => {
    validateLocal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localMaxPrice, localAirlines, localSeatClasses, localAmenities, localMinDeparture, localMaxDeparture, localMinArrival, localMaxArrival]);

  // * for real-time update on filters content based on new params/URL
  useEffect(() => {
    const maxPriceParam = searchParams.get("maxprice");

    let targetMaxPrice: number;
    if (maxPriceParam) {
      targetMaxPrice = Number(maxPriceParam);
    } else {
      targetMaxPrice = metadata?.maxPrice ?? -1;
    }

    const airlinesParam = searchParams.getAll("airlines");
    const seatClassesParam = searchParams.getAll("seatclasses");
    const amenitiesParam = searchParams.getAll("amenities");
    const minDepartureParam = searchParams.get("mindeparture");
    const maxDepartureParam = searchParams.get("maxdeparture");
    const minArrivalParam = searchParams.get("minarrival");
    const maxArrivalParam = searchParams.get("maxarrival");

    if (targetMaxPrice !== -1) {
      setLocalMaxPrice(targetMaxPrice);
    }

    if (airlinesParam) {
      setLocalAirlines(airlinesParam);
    } else {
      setLocalAirlines([]);
    }

    if (seatClassesParam) {
      setLocalSeatClasses(seatClassesParam);
    } else {
      setLocalSeatClasses([]);
    }

    if (amenitiesParam) {
      setLocalAmenities(amenitiesParam);
    } else {
      setLocalAmenities([]);
    }

    setLocalMinDeparture(minDepartureParam ?? undefined);
    setLocalMaxDeparture(maxDepartureParam ?? undefined);
    setLocalMinArrival(minArrivalParam ?? undefined);
    setLocalMaxArrival(maxArrivalParam ?? undefined);

    validateLocal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, metadata]);

  // ? temporary async for testing purposes if needed to make it load longer (via fetchDataSimulated method)
  async function applyFilters() {
    console.log("dbg 0.0: ", isApplyingFilter)
    if (isApplyingFilter) {
      console.log("dbg 0.1: ", isApplyingFilter)
      return;
    }
    console.log("dbg 0.2: ", isApplyingFilter)
    setIsApplyingFilter(true);
    console.log("dbg 0.3: ", isApplyingFilter)
    if (!validateLocal()) {
      setIsApplyingFilter(false);
      return;
    }

    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");
    params.set("maxprice", String(localMaxPrice));

    params.delete("airlines");
    localAirlines.forEach(a => params.append("airlines", a));

    params.delete("seatclasses");
    localSeatClasses.forEach(sc => params.append("seatclasses", sc));

    params.delete("amenities");
    localAmenities.forEach(sc => params.append("amenities", sc));

    // if (localAmenities.length > 0) params.set("amenities", localAmenities.join(","));
    // else params.delete("amenities");

    if (localMinDeparture) params.set("mindeparture", localMinDeparture);
    else params.delete("mindeparture");
    if (localMaxDeparture) params.set("maxdeparture", localMaxDeparture);
    else params.delete("maxdeparture");

    if (localMinArrival) params.set("minarrival", localMinArrival);
    else params.delete("minarrival");
    if (localMaxArrival) params.set("maxarrival", localMaxArrival);
    else params.delete("maxarrival");

    console.log("dbg 1: ", params.toString())
    console.log("dbg 2: ", searchParams.toString())

    if (params.toString() === searchParams.toString()) {
      console.log("dbg 3: sama aja params");
      // await fetchDataSimulated(2000); // ! for testing purposes
      setIsApplyingFilter(false);
      return;
    }

    try {
      router.push(`?${params.toString()}`);
      console.log("dbg params after push/filter updt: ", window.location.href);
    } finally {
      console.log("dbg 4: finally ends");
      setTimeout(() => {
        setIsApplyingFilter(false);
      }, 500); // ! for testing purposes!
      if (filtersWrapperRef.current) {
        filtersWrapperRef.current.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  }

  function clearAllFilters() {
    setLocalMaxPrice(getInitialMaxPrice() ?? 0);
    setLocalAirlines([]);
    setLocalSeatClasses([]);
    setLocalAmenities([]);
    setLocalMinDeparture(undefined);
    setLocalMaxDeparture(undefined);
    setLocalMinArrival(undefined);
    setLocalMaxArrival(undefined);
    setValidationErrors({});

    const params = new URLSearchParams();
    const currentCategory = searchParams.get("category") ?? "flights";
    params.set("category", currentCategory);
    params.set("page", "1");

    router.push(`?${params.toString()}`);
    if (filtersWrapperRef.current){
      filtersWrapperRef.current.scrollTo({top: 0, behavior: "smooth"});
    }
  }

  return (
    <>
      {isFetching && !metadata && (
        <StyledFiltersSkeleton />
      )}
      {!isFetching && isError && !metadata && (
        <div className="p-6 rounded-3xl bg-white-900 row-span-3 h-100 overflow-y-auto">
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
        </div>
      )}
      {
        !isFetching && metadata && (
          <div className="px-6 pt-5 pb-3 rounded-3xl bg-white-900 overflow-clip box-b row-span-3 max-h-125 h-fit flex flex-col">
            <div className="border-b pb-3 border-accent-secondary-900 bg-white-900">
              <StyledTypography fontSizeInput={20} fontWeightInput="bold" sx={{ color: "var(--color-primary-500)" }} >
                Filters
              </StyledTypography>
            </div>
            <div ref={filtersWrapperRef} className="flex-1 overflow-y-auto space-y-2.5 py-3 mx-1">
              <div className="w-full flex flex-col">
                <div className="flex gap-x-2 items-center mb-2">
                  <StyledTypography fontSizeInput={16} fontWeightInput="bold">
                    Max. Price
                  </StyledTypography>
                  <StyledTypography fontSizeInput={14} fontWeightInput="normal" sx={{ bgcolor: 'var(--color-primary-500)', color: 'var(--color-white-900)', paddingX: 1.5, paddingY: 0.5, borderRadius: 4 }}>
                    Rp {localMaxPrice.toLocaleString('id-ID')}
                  </StyledTypography>
                </div>
                <div className="ms-4 w-[75%]">
                  <MaxPriceSlider min={MIN_PRICE} max={MAX_PRICE} step={200000} onChange={(_: Event, v: number | number[]) => setLocalMaxPrice(v as number)} value={localMaxPrice} defaultValue={0} marks={marks} valueLabelDisplay="auto" slots={{ valueLabel: StyledSliderLabel }} />
                  {validationErrors.maxprice && <p className="text-red-500 text-sm mt-1">{validationErrors.maxprice}</p>}
                </div>
              </div>
              {/*  // TODO: study thereactselect more about the styling and all/other components  might be  useful! */}
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
                <MultiSelectDropdown
                  label="Airlines"
                  options={metadata.airlines}
                  selected={localAirlines}
                  onChange={setLocalAirlines}
                />
              </div>
              <div className="mb-2">
                <MultiCheckboxGroup
                  label="Seat Classes"
                  options={metadata.seatClasses}
                  selected={localSeatClasses}
                  onChange={setLocalSeatClasses}
                />
              </div>
              <div className="mb-2">
                <MultiCheckboxGroup
                  label="Amenities"
                  options={metadata.amenities}
                  selected={localAmenities}
                  onChange={setLocalAmenities}
                />
              </div>
              <div className="mb-2">
                <DateTimeInput
                  label="Min. Departure Time"
                  value={localMinDeparture}
                  onChange={setLocalMinDeparture}
                />
                {validationErrors.mindeparture && <p className="text-red-500 text-sm mt-1">{validationErrors.mindeparture}</p>}
              </div>
              <div className="mb-2">
                <DateTimeInput
                  label="Max. Departure Time"
                  value={localMaxDeparture}
                  onChange={setLocalMaxDeparture}
                />
                {validationErrors.maxdeparture && <p className="text-red-500 text-sm mt-1">{validationErrors.maxdeparture}</p>}
              </div>
              <div className="mb-2">
                <DateTimeInput
                  label="Min. Arrival Time"
                  value={localMinArrival}
                  onChange={setLocalMinArrival}
                />
                {validationErrors.minarrival && <p className="text-red-500 text-sm mt-1">{validationErrors.minarrival}</p>}
              </div>
              <div className="mb-2">
                <DateTimeInput
                  label="Max. Arrival Time"
                  value={localMaxArrival}
                  onChange={setLocalMaxArrival}
                />
                {validationErrors.maxarrival && <p className="text-red-500 text-sm mt-1">{validationErrors.maxarrival}</p>}
              </div>
            </div>
            <div className="border-t pt-3 border-accent-secondary-900 bg-white-900 flex justify-between">
              <button
                onClick={clearAllFilters}
                disabled={isApplyingFilter || !hasActiveFilters}
                className={`border border-secondary-900 text-secondary-900 px-4 py-2.5 rounded-4xl font-bold hover:bg-secondary-900 hover:text-white-900 transition-colors ${isApplyingFilter || !hasActiveFilters ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Clear All
              </button>
              <button
                onClick={applyFilters}
                disabled={Object.keys(validationErrors).length > 0 || isApplyingFilter}
                className={`bg-primary-500 text-white-900 px-4 py-2.5 rounded-4xl font-bold hover:bg-primary-600 transition-colors shadow-md ${Object.keys(validationErrors).length > 0 || isApplyingFilter ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {(isApplyingFilter) ? (
                  <span className="flex flex-row items-center gap-x-2">
                    <CircularProgress size="20px" sx={{ color: 'var(--color-white-900)' }} />
                    Applying
                  </span>
                ) : (
                  "Apply Filters"
                )}
              </button>
            </div>
          </div >
        )
      }
    </>
  );
}

