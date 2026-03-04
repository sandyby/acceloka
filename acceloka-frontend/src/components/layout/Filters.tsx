"use client";

import { CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useTicketMetadata } from "@/contexts/TicketMetadataContext";
import StyledTypography from "@/components/ui/StyledTypography";
import { useEffect, useRef, useState, useContext, act } from "react";
import StyledFiltersSkeleton from "@/components/ui/skeletons/StyledFiltersSkeleton";
import DateTimeInput from "@/components/ui/DateTimeInput";
import { FilterSchema } from "@/lib/filters-schema";
import z from "zod";
import MultiSelectDropdown from "../ui/MultiSelectDropdown";
import { StyledSlider, StyledSliderLabel } from "@/components/ui/StyledRangeSlider";
import MultiCheckboxGroup from "../ui/MultiCheckboxGroup";
import { ActiveCategoryContext } from "@/contexts/ActiveCategoryContext";
import { PersonRounded } from "@mui/icons-material";

export default function Filters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const filtersWrapperRef = useRef<HTMLDivElement>(null);

  const { activeCategory } = useContext(ActiveCategoryContext);
  const { data: metadata, isFetching, isError, refetch } = useTicketMetadata();
  const [isApplyingFilter, setIsApplyingFilter] = useState<boolean>(false);

  // * price slider marks punya
  const MAX_PRICE = metadata?.maxPrice ?? 0;
  const MIN_PRICE = 0;
  const priceMarks = [
    {
      value: MIN_PRICE,
      label: MIN_PRICE.toString(),
    },
    {
      value: MAX_PRICE,
      label: MAX_PRICE!.toString(),
    },
  ];

  // TODO:  buat mapper
  const flightTicketFilters = [
    "maxprice", "airlines", "amenities", "seatclasses", "mindeparture",
    "maxdeparture", "minarrival", "maxarrival"
  ];

  const hotelTicketFilters = [
    "maxprice", "airlines", "amenities", "seatclasses", "mindeparture",
    "maxdeparture", "minarrival", "maxarrival"
  ];

  // * clear all button needs (conditional)
  const hasActiveFilters = activeCategory === "flights" ? flightTicketFilters.some(key => searchParams.has(key)) : activeCategory === "hotels" ? hotelTicketFilters.some(key => searchParams.has(key)) : false;

  const getInitialMaxPrice = () => {
    const param = searchParams.get("maxprice");
    if (param) {
      console.log("dbg gim 0: ", param);
      return Number(param);
    }
    console.log("dbg gim 1: ", metadata?.maxPrice);
    return metadata?.maxPrice ?? 0;
  };

  const getInitialMaxOccupancy = () => {
    const param = searchParams.get("maxoccupancy");
    if (param) {
      return Number(param);
    }
    return metadata?.maxOccupancy ?? 1;
  };

  // * filters need
  // TODO: somehow make it polymorhpic to each ticket cards type
  const [localMaxPrice, setLocalMaxPrice] = useState<number>(getInitialMaxPrice());
  const [localMaxOccupancy, setLocalMaxOccupancy] = useState<number>(getInitialMaxOccupancy());
  const [localAmenities, setLocalAmenities] = useState<string[]>([]);
  const [localAirlines, setLocalAirlines] = useState<string[]>([]);
  const [localSeatClasses, setLocalSeatClasses] = useState<string[]>([]);
  const [localHotelNames, setLocalHotelNames] = useState<string[]>([]);
  const [localRoomTypes, setLocalRoomTypes] = useState<string[]>([]);
  const [localMinDeparture, setLocalMinDeparture] = useState<string | undefined>();
  const [localMaxDeparture, setLocalMaxDeparture] = useState<string | undefined>();
  const [localMinArrival, setLocalMinArrival] = useState<string | undefined>();
  const [localMaxArrival, setLocalMaxArrival] = useState<string | undefined>();
  const [localMinCheckInDate, setLocalMinCheckInDate] = useState<string | undefined>();
  const [localMaxCheckOutDate, setLocalMaxCheckOutDate] = useState<string | undefined>();

  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});

  const validateLocal = () => {
    try {
      FilterSchema.parse({
        maxprice: localMaxPrice,
        maxoccupancy: localMaxOccupancy,
        airlines: localAirlines,
        seatclasses: localSeatClasses,
        hotelnames: localHotelNames,
        roomtypes: localRoomTypes,
        amenities: localAmenities,
        mindeparture: localMinDeparture,
        maxdeparture: localMaxDeparture,
        minarrival: localMinArrival,
        maxarrival: localMaxArrival,
        mincheckin: localMinCheckInDate,
        maxcheckin: localMaxCheckOutDate,
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
    const seatClassesParam = searchParams.getAll("seatclasses");
    const airlinesParam = searchParams.getAll("airlines");
    const roomTypesParam = searchParams.getAll("roomtypes");
    const hotelNamesParam = searchParams.getAll("hotels");
    const amenitiesParam = searchParams.getAll("amenities");
    const minDepartureParam = searchParams.get("mindeparture");
    const maxDepartureParam = searchParams.get("maxdeparture");
    const minArrivalParam = searchParams.get("minarrival");
    const maxArrivalParam = searchParams.get("maxarrival");
    const minCheckInDateParam = searchParams.get("mincheckin");
    const maxCheckOutDateParam = searchParams.get("maxcheckout");

    const maxPriceParam = searchParams.get("maxprice");
    const maxOccupancyParam = searchParams.get("maxoccupancy");

    let targetMaxPrice: number;
    if (maxPriceParam) {
      targetMaxPrice = Number(maxPriceParam);
    } else {
      targetMaxPrice = metadata?.maxPrice ?? -1;
    }

    let targetMaxOccupancy: number;
    if (maxOccupancyParam) {
      targetMaxOccupancy = Number(maxOccupancyParam);
    } else {
      targetMaxOccupancy = metadata?.maxOccupancy ?? -1;
    }

    if (targetMaxPrice !== -1) {
      setLocalMaxPrice(targetMaxPrice);
    }

    if (targetMaxOccupancy !== -1) {
      setLocalMaxOccupancy(targetMaxOccupancy);
    }

    if (airlinesParam) {
      setLocalAirlines(airlinesParam);
    } else {
      setLocalAirlines([]);
    }

    if (hotelNamesParam) {
      setLocalHotelNames(hotelNamesParam);
    } else {
      setLocalHotelNames([]);
    }

    if (seatClassesParam) {
      setLocalSeatClasses(seatClassesParam);
    } else {
      setLocalSeatClasses([]);
    }

    if (roomTypesParam) {
      setLocalRoomTypes(roomTypesParam);
    } else {
      setLocalRoomTypes([]);
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
    setLocalMinCheckInDate(minCheckInDateParam ?? undefined);
    setLocalMaxCheckOutDate(maxCheckOutDateParam ?? undefined);

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

    if (activeCategory === "flights") {
      params.delete("airlines");
      localAirlines.forEach(a => params.append("airlines", a));

      params.delete("seatclasses");
      localSeatClasses.forEach(sc => params.append("seatclasses", sc));

      if (localMinDeparture) {
        params.set("mindeparture", localMinDeparture);
      } else {
        params.delete("mindeparture");
      }

      if (localMaxDeparture) {
        params.set("maxdeparture", localMaxDeparture);
      }
      else {
        params.delete("maxdeparture");
      }

      if (localMinArrival) {
        params.set("minarrival", localMinArrival);
      }
      else {
        params.delete("minarrival");
      }

      if (localMaxArrival) {
        params.set("maxarrival", localMaxArrival);
      }
      else {
        params.delete("maxarrival");
      }
    }

    if (activeCategory === "hotels") {
      params.delete("maxoccupancy");
      params.set("maxoccupancy", String(localMaxOccupancy));

      params.delete("hotels");
      localHotelNames.forEach(htl => params.append("hotels", htl));

      params.delete("roomtypes");
      localRoomTypes.forEach(rt => params.append("roomtypes", rt));

      if (localMinCheckInDate) {
        params.set("mincheckin", localMinCheckInDate);
      }
      else {
        params.delete("mincheckin");
      }

      if (localMaxCheckOutDate) {
        params.set("maxcheckout", localMaxCheckOutDate);
      }
      else {
        params.delete("maxcheckout");
      }
    }

    if (["flights", "hotels", "trains", "buses", "sea-transportations"].some(key => activeCategory === key)) {
      params.delete("amenities");
      localAmenities.forEach(sc => params.append("amenities", sc));
    } else if (activeCategory === "concerts") {
      // TODO: concert packages
    }

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
    if (activeCategory === "hotels") {
      setLocalHotelNames([]);
      setLocalRoomTypes([]);
      setLocalMinCheckInDate(undefined);
      setLocalMaxCheckOutDate(undefined);
    }

    if (activeCategory === "flights") {
      setLocalAirlines([]);
      setLocalSeatClasses([]);
      setLocalMinDeparture(undefined);
      setLocalMaxDeparture(undefined);
      setLocalMinArrival(undefined);
      setLocalMaxArrival(undefined);
    }

    if (["flights", "hotels", "trains", "buses", "sea-transportations"].some(key => activeCategory === key)) {
      setLocalAmenities([]);
    }

    setValidationErrors({});

    const params = new URLSearchParams();
    const currentCategory = searchParams.get("category") ?? "flights";
    params.set("category", currentCategory);
    params.set("page", "1");

    router.push(`?${params.toString()}`);
    if (filtersWrapperRef.current) {
      filtersWrapperRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  return (
    <>
      {isFetching || !metadata && (
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
                  <StyledSlider min={MIN_PRICE} max={MAX_PRICE} step={200000} onChange={(_: Event, v: number | number[]) => setLocalMaxPrice(v as number)} value={localMaxPrice} defaultValue={0} marks={priceMarks} valueLabelDisplay="auto" slots={{ valueLabel: StyledSliderLabel }} />
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
              {(activeCategory == "flights") && metadata?.airlines && (
                <div className="mb-2">
                  <MultiSelectDropdown
                    label="Airlines"
                    options={metadata.airlines}
                    selected={localAirlines}
                    onChange={setLocalAirlines}
                  />
                </div>
              )}
              {(activeCategory == "hotels") && metadata?.hotelNames && (
                <div className="mb-2">
                  <MultiSelectDropdown
                    label="Hotels"
                    options={metadata.hotelNames}
                    selected={localHotelNames}
                    onChange={setLocalHotelNames}
                  />
                </div>
              )}
              {(activeCategory === "hotels") && metadata?.maxOccupancy && (
                <>
                  <div className="flex gap-x-2 items-center mb-2">
                    <StyledTypography fontSizeInput={16} fontWeightInput="bold">
                      Max. Occupancy
                    </StyledTypography>
                    <StyledTypography fontSizeInput={14} fontWeightInput="normal" sx={{ bgcolor: 'var(--color-primary-500)', color: 'var(--color-white-900)', paddingLeft: 1.5, paddingRight: 2, paddingY: 0.5, borderRadius: 4 }}>
                      <span>
                        <PersonRounded sx={{ color: "var(--color-white-900)", fontSize: "20px" }} />
                      </span> {localMaxOccupancy}
                    </StyledTypography>
                  </div>
                  <div className="mb-2 ms-4 w-[75%]">
                    <StyledSlider min={1} max={metadata.maxOccupancy} step={1} onChange={(_: Event, v: number | number[]) => setLocalMaxOccupancy(v as number)} value={localMaxOccupancy} defaultValue={1} marks={[
                      {
                        value: 0,
                        label: '0',
                      },
                      {
                        value: metadata.maxOccupancy,
                        label: metadata.maxOccupancy.toString(),
                      },
                    ]} valueLabelDisplay="auto" slots={{ valueLabel: StyledSliderLabel }} />
                    {validationErrors.maxoccupancy && <p className="text-red-500 text-sm mt-1">{validationErrors.maxoccupancy}</p>}
                  </div>
                </>
              )}
              {(activeCategory === "hotels") && metadata?.minCheckInDate && metadata?.maxCheckOutDate && (
                <>
                  <div className="mb-2">
                    <DateTimeInput
                      label="Min. Check In Time"
                      value={localMinCheckInDate}
                      onChange={setLocalMinCheckInDate}
                    />
                    {validationErrors.mincheckin && <p className="text-red-500 text-sm mt-1">{validationErrors.mincheckin}</p>}
                  </div>
                  <div className="mb-2">
                    <DateTimeInput
                      label="Max. Check Out Time"
                      value={localMaxCheckOutDate}
                      onChange={setLocalMaxCheckOutDate}
                    />
                    {validationErrors.maxcheckout && <p className="text-red-500 text-sm mt-1">{validationErrors.maxcheckout}</p>}
                  </div>
                </>
              )}
              {(activeCategory == "hotels") && metadata?.roomTypes && (
                <div className="mb-2">
                  <MultiCheckboxGroup
                    label="Room Types"
                    options={metadata.roomTypes}
                    selected={localRoomTypes}
                    onChange={setLocalRoomTypes}
                  />
                </div>
              )}
              {["flights", "trains", "buses", "sea-transportations"].includes(activeCategory)
                && metadata?.seatClasses && (
                  <div className="mb-2">
                    <MultiCheckboxGroup
                      label="Seat Classes"
                      options={metadata.seatClasses}
                      selected={localSeatClasses}
                      onChange={setLocalSeatClasses}
                    />
                  </div>
                )}
              {/* <MultiCheckboxGroup
                  label="Seat Classes"
                  options={metadata.seatClasses}
                  selected={localSeatClasses}
                  onChange={setLocalSeatClasses}
                /> */}
              {["flights", "trains", "buses", "sea-transportations", "hotels"].includes(activeCategory)
                && metadata?.amenities && (
                  <div className="mb-2">
                    <MultiCheckboxGroup
                      label="Amenities"
                      options={metadata.amenities}
                      selected={localAmenities}
                      onChange={setLocalAmenities}
                    />

                  </div>
                )}
              {/* <MultiCheckboxGroup
                label="Amenities"
                options={metadata.amenities}
                selected={localAmenities}
                onChange={setLocalAmenities}
              /> */}
              {["flights", "trains", "buses", "sea-transportations"].includes(activeCategory)
                && metadata?.minDeparture && metadata?.maxDeparture && metadata?.minArrival && metadata?.maxArrival && (
                  <>
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
                  </>
                )}
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

