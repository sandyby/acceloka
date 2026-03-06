"use client";

import { CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import useTicketMetadata from "@/hooks/useTicketsMetadata";
import StyledTypography from "@/components/ui/StyledTypography";
import { useEffect, useRef, useState, useContext, act, Suspense } from "react";
import StyledFiltersSkeleton from "@/components/ui/skeletons/StyledFiltersSkeleton";
import DateTimeInput from "@/components/ui/DateTimeInput";
import { FilterSchema } from "@/lib/filters-schema";
import z, { string } from "zod";
import MultiSelectDropdown from "../ui/MultiSelectDropdown";
import { StyledSlider, StyledSliderLabel } from "@/components/ui/StyledRangeSlider";
import MultiCheckboxGroup from "../ui/MultiCheckboxGroup";
import { ActiveCategoryContext } from "@/contexts/ActiveCategoryContext";
import { PersonRounded, LuggageRounded } from "@mui/icons-material";
import DateInput from "../ui/DateInput";
import useScrollToTop from "@/hooks/useScrollToTop";
import TimeInput from "../ui/TimeInput";
import DurationInput from "../ui/DurationInput";
import { minutesToHHmmFormat } from "@/lib/utils";
import ButtonGroup from "../ui/ButtonGroup";

export default function Filters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { hasToScrollToTop, setHasToScrollToTop } = useScrollToTop();

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
    "maxdeparture", "minarrival", "maxarrival", "direct"
  ];

  const hotelTicketFilters = [
    "maxprice", "airlines", "amenities", "seatclasses", "mindeparture",
    "maxdeparture", "minarrival", "maxarrival"
  ];

  const concertTicketFilters = [
    "maxprice", "venue", "seatsections", "concertdate", "packages"
  ];

  const movieTicketFIlters = [
    "maxprice", "cinemas", "seatsections", "types", "minscreening", "maxscreening", "maxduration"
  ];

  // * in case more filters are applied in the future
  const trainTicketFilters = [
    "maxprice", "mindeparture", "maxdeparture", "types", "minarrival", "maxarrival", "direct", "amenities"
  ];

  const busTicketFilters = [
    "maxprice", "mindeparture", "maxdeparture", "types", "minarrival", "maxarrival", "direct", "amenities"
  ];

  const seaTransportationTicketFilters = [
    "maxprice", "mindeparture", "maxdeparture", "types", "minarrival", "maxarrival", "direct", "amenities"
  ];

  // * clear all button needs (conditional)
  const hasActiveFilters = activeCategory === "flights" ? flightTicketFilters.some(key => searchParams.has(key)) : activeCategory === "hotels" ? hotelTicketFilters.some(key => searchParams.has(key)) : activeCategory === "concerts" ? concertTicketFilters.some(key => searchParams.has(key)) : activeCategory === "movies" ? movieTicketFIlters.some(key => searchParams.has(key)) : activeCategory === "trains" ? trainTicketFilters.some(key => searchParams.has(key)) : activeCategory === "buses" ? busTicketFilters.some(key => searchParams.has(key)) : activeCategory === "sea-transportations" ? seaTransportationTicketFilters.some(key => searchParams.has(key)) : false;

  const getInitialMaxPrice = () => {
    const param = searchParams.get("maxprice");
    if (param) {
      console.log("dbg gim 0: ", param);
      return Number(param);
    }
    console.log("dbg gim 1: ", metadata?.maxPrice);
    return metadata?.maxPrice ?? 999999;
  };

  const getInitialMaxOccupancy = () => {
    const param = searchParams.get("maxoccupancy");
    if (param) {
      return Number(param);
    }
    return metadata?.maxOccupancy ?? 1;
  };

  const getInitialBaggageKg = () => {
    const param = searchParams.get("baggagekg");
    console.log("dbg bagagagaga 1: ", param);
    if (param) {
      console.log("dbg bagagagaga 2: ", metadata?.maxBaggageKg);
      return Number(param);
    }
    console.log("dbg bagagagaga 3: ", metadata?.maxBaggageKg);
    console.log("dbg bagagagaga 4 seharusnya 0!");
    return 0;
  };

  const getInitialMaxDuration = (): string | undefined => {
    const param = searchParams.get("maxduration");
    if (param) {
      return param;
    }
    console.log("dbg maxdur: ", metadata?.maxDurationInMinutes);
    return minutesToHHmmFormat(metadata?.maxDurationInMinutes) ?? undefined;
  };

  // * filters need
  // TODO: somehow make it polymorhpic to each ticket cards type
  const [localMaxPrice, setLocalMaxPrice] = useState<number>(getInitialMaxPrice());
  const [localMaxOccupancy, setLocalMaxOccupancy] = useState<number>(getInitialMaxOccupancy());
  const [localAmenities, setLocalAmenities] = useState<string[]>([]);
  const [localPackages, setLocalPackages] = useState<string[]>([]);
  const [localAirlines, setLocalAirlines] = useState<string[]>([]);
  const [localSeatClasses, setLocalSeatClasses] = useState<string[]>([]);
  const [localHotelNames, setLocalHotelNames] = useState<string[]>([]);
  const [localVenues, setLocalVenues] = useState<string[]>([]);
  const [localCinemas, setLocalCinemas] = useState<string[]>([]);
  const [localTypes, setLocalTypes] = useState<string[]>([]);
  // TODO: mungkin bisa ganti dari boolean jadi ke list of either direct or/and transits, which will display direct if only direct exists, vice versa
  const [localDirect, setLocalDirect] = useState<boolean | undefined>(undefined);
  const [localSeatSections, setLocalSeatSections] = useState<string[]>([]);
  const [localMinConcertDate, setLocalMinConcertDate] = useState<string | undefined>();
  const [localMaxConcertDate, setLocalMaxConcertDate] = useState<string | undefined>();
  const [localMinScreeningTime, setLocalMinScreeningTime] = useState<string | undefined>();
  const [localMaxScreeningTime, setLocalMaxScreeningTime] = useState<string | undefined>();
  const [localMaxDuration, setLocalMaxDuration] = useState<string | undefined>(getInitialMaxDuration());
  const [localBaggageKg, setLocalBaggageKg] = useState<number>(getInitialBaggageKg());
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
        seatsections: localSeatSections,
        hotelnames: localHotelNames,
        cinemas: localCinemas,
        amenities: localAmenities,
        packages: localPackages,
        mindeparture: localMinDeparture,
        maxdeparture: localMaxDeparture,
        minarrival: localMinArrival,
        maxarrival: localMaxArrival,
        mincheckin: localMinCheckInDate,
        maxcheckout: localMaxCheckOutDate,
        minconcert: localMinConcertDate,
        maxconcert: localMaxConcertDate,
        minscreening: localMinScreeningTime,
        maxscreening: localMaxScreeningTime,
        maxduration: localMaxDuration,
        baggagekg: localBaggageKg,
        direct: localDirect,
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

  // TODO: fix logic for this custom hook for smooth scrolling to the top, reset scroll position
  // useEffect(() => {
  //   if (filtersWrapperRef.current) {
  //     filtersWrapperRef.current.scrollTo({ top: 0, behavior: "smooth" });
  //   }
  // }, [hasToScrollToTop]);

  // * for real-time like validating if local state changes
  useEffect(() => {
    validateLocal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localMaxPrice, localAirlines, localHotelNames, localMaxCheckOutDate, localMinCheckInDate, localMaxConcertDate, localMinConcertDate, localMaxOccupancy, localSeatSections, localVenues, localSeatClasses, localSeatSections, localAmenities, localPackages, localMinDeparture, localMaxDeparture, localMinArrival, localMaxArrival, localMinScreeningTime, localMaxScreeningTime, localMaxDuration, localCinemas, localTypes, localDirect, localBaggageKg]);

  // * for real-time update on filters content based on new params/URL
  useEffect(() => {
    const seatClassesParam = searchParams.getAll("seatclasses");
    const seatSectionsParam = searchParams.getAll("seatsections");
    const airlinesParam = searchParams.getAll("airlines");
    const typesParam = searchParams.getAll("types");
    const venuesParam = searchParams.getAll("venues");
    const hotelNamesParam = searchParams.getAll("hotels");
    const cinemasParam = searchParams.getAll("cinemas");
    const packagesParam = searchParams.getAll("packages");
    const amenitiesParam = searchParams.getAll("amenities");
    const minDepartureParam = searchParams.get("mindeparture");
    const maxDepartureParam = searchParams.get("maxdeparture");
    const minArrivalParam = searchParams.get("minarrival");
    const maxArrivalParam = searchParams.get("maxarrival");
    const minCheckInDateParam = searchParams.get("mincheckin");
    const maxCheckOutDateParam = searchParams.get("maxcheckout");
    const minConcertDateParam = searchParams.get("minconcert");
    const maxConcertDateParam = searchParams.get("maxconcert");
    const minScreeningTimeParam = searchParams.get("minscreening");
    const maxScreeningTimeParam = searchParams.get("maxscreening");
    const maxDurationParam = searchParams.get("maxduration");
    const baggageKgParam = searchParams.get("baggagekg");
    const directParam = searchParams.get("direct");

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

    let targetBaggageKg: number;
    if (baggageKgParam) {
      console.log("dbg bag: ", baggageKgParam);
      targetBaggageKg = Number(baggageKgParam);
    } else {
      console.log("dbg bag meta: ", metadata?.maxBaggageKg);
      targetBaggageKg = -1;
    }

    let targetDirect: boolean | undefined;
    if (directParam) {
      const loweredDirectParam = directParam.toLowerCase();
      targetDirect = loweredDirectParam === "false" ? false : loweredDirectParam === "true" ? true : undefined;
    } else {
      targetDirect = undefined;
    }
    setLocalDirect(targetDirect);

    let targetMaxDuration: string | undefined;
    if (maxDurationParam) {
      targetMaxDuration = maxDurationParam;
    } else {
      targetMaxDuration = minutesToHHmmFormat(metadata?.maxDurationInMinutes) ?? undefined;
      console.log("dbg maxmaxmax: ", targetMaxDuration);
    }

    if (targetMaxDuration) {
      console.log("dbg tarmaxx: ", targetMaxDuration);
      setLocalMaxDuration(targetMaxDuration);
    }

    if (targetMaxPrice !== -1) {
      setLocalMaxPrice(targetMaxPrice);
    }

    console.log("dbg maxbag tar1: ", targetBaggageKg);
    if (targetBaggageKg !== -1) {
      console.log("dbg maxbag tar2: ", targetBaggageKg);
      setLocalBaggageKg(targetBaggageKg);
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

    if (venuesParam) {
      setLocalVenues(venuesParam);
    } else {
      setLocalVenues([]);
    }

    if (cinemasParam) {
      setLocalCinemas(cinemasParam);
    } else {
      setLocalCinemas([]);
    }

    if (seatClassesParam) {
      setLocalSeatClasses(seatClassesParam);
    } else {
      setLocalSeatClasses([]);
    }

    if (seatSectionsParam) {
      setLocalSeatSections(seatSectionsParam);
    } else {
      setLocalSeatSections([]);
    }

    if (typesParam) {
      setLocalTypes(typesParam);
    } else {
      setLocalTypes([]);
    }

    if (amenitiesParam) {
      setLocalAmenities(amenitiesParam);
    } else {
      setLocalAmenities([]);
    }

    if (packagesParam) {
      setLocalPackages(packagesParam);
    } else {
      setLocalPackages([]);
    }

    setLocalMinDeparture(minDepartureParam ?? undefined);
    setLocalMaxDeparture(maxDepartureParam ?? undefined);
    setLocalMinArrival(minArrivalParam ?? undefined);
    setLocalMaxArrival(maxArrivalParam ?? undefined);
    setLocalMinCheckInDate(minCheckInDateParam ?? undefined);
    setLocalMaxCheckOutDate(maxCheckOutDateParam ?? undefined);
    setLocalMinConcertDate(minConcertDateParam ?? undefined);
    setLocalMaxConcertDate(maxConcertDateParam ?? undefined);
    setLocalMinScreeningTime(minScreeningTimeParam ?? undefined);
    setLocalMaxScreeningTime(maxScreeningTimeParam ?? undefined);

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

      if (localBaggageKg) {
        params.set("baggagekg", String(localBaggageKg));
      } else {
        params.delete("baggagekg");
      }
    }

    if (activeCategory === "hotels") {
      params.delete("maxoccupancy");
      if (localMaxOccupancy) {
        params.set("maxoccupancy", String(localMaxOccupancy));
      }

      params.delete("hotels");
      localHotelNames.forEach(htl => params.append("hotels", htl));

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

    if (activeCategory === "concerts") {
      params.delete("venues");
      localVenues.forEach(v => params.append("venues", v));

      params.delete("seatsections");
      localSeatSections.forEach(ss => params.append("seatsections", ss));

      if (localMinConcertDate) {
        params.set("minconcert", localMinConcertDate);
      }
      else {
        params.delete("minconcert");
      }

      if (localMaxConcertDate) {
        params.set("maxconcert", localMaxConcertDate);
      }
      else {
        params.delete("maxconcert");
      }

      params.delete("packages");
      localPackages.forEach(pkg => params.append("packages", pkg));
    }

    if (activeCategory === "movies") {
      params.delete("cinemas");
      localCinemas.forEach(c => params.append("cinemas", c));

      params.delete("seatsections");
      localSeatSections.forEach(ss => params.append("seatsections", ss));

      if (localMinScreeningTime) {
        params.set("minscreening", localMinScreeningTime);
      }
      else {
        params.delete("minscreening");
      }

      if (localMaxScreeningTime) {
        params.set("maxscreening", localMaxScreeningTime);
      }
      else {
        params.delete("maxscreening");
      }
    }

    // * for future filters (if any)
    if (["movies"].some(key => activeCategory === key)) {
      if (localMaxDuration) {
        params.set("maxduration", localMaxDuration);
      }
      else {
        params.delete("maxduration");
      }
    }

    if (["flights", "trains", "buses", "sea-transportations"].some(key => activeCategory === key)) {
      params.delete("seatclasses");
      localSeatClasses.forEach(sc => params.append("seatclasses", sc));

      if (localDirect === undefined) {
        params.delete("direct");
      } else {
        params.delete("direct");
        params.set("direct", String(localDirect));
      }

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

    if (["hotels", "movies", "trains", "buses", "sea-transportations"].some(key => activeCategory === key)) {
      params.delete("types");
      localTypes.forEach(t => params.append("types", t));
    }

    if (["flights", "hotels", "trains", "buses", "sea-transportations"].some(key => activeCategory === key)) {
      params.delete("amenities");
      localAmenities.forEach(a => params.append("amenities", a));
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
      // setHasToScrollToTop(true); // TODO: fix!
      if (filtersWrapperRef.current) {
        filtersWrapperRef.current.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  }

  function clearAllFilters() {
    setLocalMaxPrice(getInitialMaxPrice() ?? 0);
    if (activeCategory === "hotels") {
      setLocalHotelNames([]);
      setLocalMaxOccupancy(getInitialMaxOccupancy());
      setLocalMinCheckInDate(undefined);
      setLocalMaxCheckOutDate(undefined);
    }

    if (activeCategory === "flights") {
      setLocalAirlines([]);
      setLocalBaggageKg(0);
    }

    if (activeCategory === "concerts") {
      setLocalVenues([]);
      setLocalPackages([]);
      setLocalMinConcertDate(undefined);
      setLocalMaxConcertDate(undefined);
    }

    if (activeCategory === "movies") {
      setLocalCinemas([]);
      setLocalMinScreeningTime(undefined);
      setLocalMaxScreeningTime(undefined);
      setLocalMaxDuration("");
    }

    if (["concerts", "movies"].some(key => activeCategory === key)) {
      setLocalSeatSections([]);
    }

    if (["flights", "trains", "buses", "sea-transportations"].some(key => activeCategory === key)) {
      setLocalSeatClasses([]);
      setLocalDirect(undefined);
      setLocalMinDeparture(undefined);
      setLocalMaxDeparture(undefined);
      setLocalMinArrival(undefined);
      setLocalMaxArrival(undefined);
    }

    if (["hotels", "movies", "trains", "buses", "sea-transportations"].some(key => activeCategory === key)) {
      setLocalTypes([]);
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
    // setHasToScrollToTop(true); // TODO: fix!
    if (filtersWrapperRef.current) {
      filtersWrapperRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  return (
    <>
      {(isFetching || !metadata) && !isError && (
        <>
          <StyledFiltersSkeleton />
        </>
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
            <div ref={filtersWrapperRef} className="flex-1 overflow-y-auto space-y-2.5 py-3 px-3 bg-white-900">
              <div className="w-full flex flex-col">
                <div className="flex gap-x-2 items-center mb-2">
                  <StyledTypography fontSizeInput={16} fontWeightInput="bold">
                    Max. Price
                  </StyledTypography>
                  <StyledTypography fontSizeInput={14} fontWeightInput="normal" sx={{ bgcolor: 'var(--color-primary-500)', color: 'var(--color-white-900)', paddingX: 1.5, paddingY: 0.5, borderRadius: 4, maxWidth: "18ch", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Rp {localMaxPrice.toLocaleString('id-ID')}
                  </StyledTypography>
                </div>
                <div className="w-[80%]">
                  <StyledSlider min={MIN_PRICE} max={MAX_PRICE} step={metadata.maxPrice * 0.05} onChange={(_: Event, v: number | number[]) => setLocalMaxPrice(v as number)} value={localMaxPrice} defaultValue={0} marks={priceMarks} valueLabelDisplay="auto" slots={{ valueLabel: StyledSliderLabel }} />
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
              {(activeCategory === "movies") && (
                <div className="mb-2">
                  <DurationInput
                    label="Max. Duration"
                    value={localMaxDuration}
                    onChange={setLocalMaxDuration}
                    maxDuration={minutesToHHmmFormat(metadata.maxDurationInMinutes) ?? "99:59"}
                  />
                  {validationErrors.maxduration && <p className="text-red-500 text-sm mt-1">{validationErrors.maxduration}</p>}
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
                  <div className="w-[80%]">
                    <StyledSlider min={1} max={metadata.maxOccupancy} step={1} onChange={(_: Event, v: number | number[]) => setLocalMaxOccupancy(v as number)} value={localMaxOccupancy} defaultValue={1} marks={[
                      {
                        value: 1,
                        label: '1',
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
              {(activeCategory === "flights") && metadata?.maxBaggageKg && (
                <div className="w-full flex flex-col">
                  <div className="flex gap-x-2 items-center mb-2">
                    <StyledTypography fontSizeInput={16} fontWeightInput="bold">
                      Baggage Weight
                    </StyledTypography>
                    <StyledTypography fontSizeInput={14} fontWeightInput="normal" sx={{ bgcolor: 'var(--color-primary-500)', color: 'var(--color-white-900)', paddingLeft: 1, paddingRight: 1.5, paddingY: 0.5, borderRadius: 4 }}>
                      <span>
                        <LuggageRounded sx={{ color: "var(--color-white-900)", fontSize: "20px" }} />
                      </span> {localBaggageKg} kg
                    </StyledTypography>
                  </div>
                  <div className="w-[80%]">
                    <StyledSlider min={0} max={metadata.maxBaggageKg} step={1} onChange={(_: Event, v: number | number[]) => setLocalBaggageKg(v as number)} value={localBaggageKg} defaultValue={0} marks={[
                      {
                        value: 0,
                        label: '0',
                      },
                      {
                        value: metadata.maxBaggageKg,
                        label: metadata.maxBaggageKg.toString(),
                      },
                    ]} valueLabelDisplay="auto" slots={{ valueLabel: StyledSliderLabel }} />
                    {validationErrors.baggagekg
                      && <p className="text-red-500 text-sm mt-1">{validationErrors.baggagekg
                      }</p>}
                  </div>
                </div>
              )}
              {["flights", "trains", "buses", "sea-transportations"].includes(activeCategory) && metadata?.directCount && metadata?.transitsCount && (
                <div className="mb-2">
                  <ButtonGroup
                    label="Transits/Stops"
                    value={localDirect}
                    onChange={setLocalDirect}
                    options={[
                      { label: "All", val: undefined },
                      { label: "Direct", val: true },
                      { label: "Transits", val: false }
                    ]}
                  />
                  <div className="h-4.25">
                    <p className="text-[12px] text-accent-primary-900 mt-1.5 px-1">
                      {localDirect === true && "Showing non-stop trips only"}
                      {localDirect === false && "Showing trips with transit(s)"}
                    </p>
                  </div>
                </div>
              )}
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
              {(activeCategory == "concerts") && metadata?.venues && (
                <div className="mb-2">
                  <MultiSelectDropdown
                    label="Venues"
                    options={metadata.venues}
                    selected={localVenues}
                    onChange={setLocalVenues}
                  />
                </div>
              )}
              {(activeCategory == "movies") && metadata?.cinemas && (
                <div className="mb-2">
                  <MultiSelectDropdown
                    label="Cinemas"
                    options={metadata.cinemas}
                    selected={localCinemas}
                    onChange={setLocalCinemas}
                  />
                </div>
              )}
              {(activeCategory === "concerts") && metadata?.minConcertDate && metadata?.maxConcertDate && (
                <>
                  <div className="mb-2">
                    <DateInput
                      label="Min. Concert Date"
                      value={localMinConcertDate}
                      onChange={setLocalMinConcertDate}
                    />
                    {validationErrors.minconcert && <p className="text-red-500 text-sm mt-1">{validationErrors.minconcert}</p>}
                  </div>
                  <div className="mb-2">
                    <DateInput
                      label="Max. Concert Date"
                      value={localMaxConcertDate}
                      onChange={setLocalMaxConcertDate}
                    />
                    {validationErrors.maxconcert && <p className="text-red-500 text-sm mt-1">{validationErrors.maxconcert}</p>}
                  </div>
                </>
              )}
              {(activeCategory === "movies") && metadata?.minScreeningTime && metadata?.maxScreeningTime && (
                <>
                  <div className="mb-2">
                    <DateTimeInput
                      label="Min. Screening Time"
                      value={localMinScreeningTime}
                      onChange={setLocalMinScreeningTime}
                    />
                    {validationErrors.minscreening && <p className="text-red-500 text-sm mt-1">{validationErrors.minscreening}</p>}
                  </div>
                  <div className="mb-2">
                    <DateTimeInput
                      label="Max. Screening Time"
                      value={localMaxScreeningTime}
                      onChange={setLocalMaxScreeningTime}
                    />
                    {validationErrors.maxscreening && <p className="text-red-500 text-sm mt-1">{validationErrors.maxscreening}</p>}
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
              {["hotels", "movies", "trains", "buses", "sea-transportations"].includes(activeCategory)
                && metadata?.types && (
                  <div className="mb-2">
                    <MultiCheckboxGroup
                      label={`${activeCategory === "hotels" ? `Room` : activeCategory === "movies" ? "Cinema" : activeCategory === "trains" ? "Train" : activeCategory === "buses" ? "Bus" : "Transportation"} Types`}
                      options={metadata.types}
                      selected={localTypes}
                      onChange={setLocalTypes}
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
              {["movies", "concerts"].includes(activeCategory)
                && metadata?.seatSections && (
                  <div className="mb-2">
                    <MultiCheckboxGroup
                      label="Seat Sections"
                      options={metadata.seatSections}
                      selected={localSeatSections}
                      onChange={setLocalSeatSections}
                    />
                  </div>
                )}
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
              {(activeCategory === "concerts")
                && metadata?.packages && (
                  <div className="mb-2">
                    <MultiCheckboxGroup
                      label="Packages"
                      options={metadata.packages}
                      selected={localPackages}
                      onChange={setLocalPackages}
                    />
                  </div>
                )}
            </div>
            <div className="border-t pt-3 border-accent-secondary-900 bg-white-900 flex justify-between">
              <button
                onClick={clearAllFilters}
                disabled={isApplyingFilter || !hasActiveFilters}
                className={`border border-secondary-900 text-secondary-900 px-4 py-2.5 rounded-4xl font-bold hover:bg-secondary-900 hover:text-white-900 transition-colors
                  ${isApplyingFilter || !hasActiveFilters ? 'opacity-50 cursor-not-allowed' : 'hover:cursor-pointer'}`
                }
              >
                Clear All
              </button>
              <button
                onClick={applyFilters}
                disabled={Object.keys(validationErrors).length > 0 || isApplyingFilter}
                className={`bg-primary-500 text-white-900 px-4 py-2.5 rounded-4xl font-bold hover:bg-primary-600 hover:cursor-pointer transition-colors shadow-md
                  ${Object.keys(validationErrors).length > 0 || isApplyingFilter ? 'opacity-50 cursor-not-allowed' : ''}`
                }
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

