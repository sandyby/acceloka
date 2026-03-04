"use client";

import { Slider, SliderValueLabelProps, Tooltip, SliderOwnProps, CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useTicketMetadata } from "@/contexts/TicketMetadataContext";
import StyledTypography from "@/components/ui/StyledTypography";
import { useEffect, useState } from "react";
import StyledFiltersSkeleton from "@/components/ui/skeletons/StyledFiltersSkeleton";
import { Select } from "thereactselect";
import DateInput from "@/components/ui/DateInput";
import DateTimeInput from "@/components/ui/DateTimeInput";
import { styled, width } from '@mui/system';
import { red } from "@mui/material/colors";
import { FilterSchema } from "@/lib/filters-schema";
import z from "zod";
import { useTicketsData } from "@/contexts/TicketsDataContext";

export default function Filters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isApplyingFilter, setIsApplyingFilter] = useState<boolean>(false);
  const { data: metadata, isFetching, isError, refetch } = useTicketMetadata();
  const { isFetching: isTicketsFetching, isError: isTicketsFetchError } = useTicketsData();


  const getInitialMaxPrice = () => {
    const param = searchParams.get("maxprice");
    if (param) return Number(param);
    return metadata?.maxPrice ?? 0;
  };

  const [localMaxPrice, setLocalMaxPrice] = useState<number>(getInitialMaxPrice);
  const [localAirline, setLocalAirline] = useState<string | undefined>();
  const [localMinDeparture, setLocalMinDeparture] = useState<string | undefined>();
  const [localMaxDeparture, setLocalMaxDeparture] = useState<string | undefined>();
  const [localMinArrival, setLocalMinArrival] = useState<string | undefined>();
  const [localMaxArrival, setLocalMaxArrival] = useState<string | undefined>();

  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});

  const validateLocal = () => {
    try {
      FilterSchema.parse({
        maxprice: localMaxPrice,
        airline: localAirline,
        mindeparture: localMinDeparture,
        maxdeparture: localMaxDeparture,
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

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    validateLocal();
  }, [localMaxPrice, localAirline, localMinDeparture, localMaxDeparture, localMinArrival, localMaxArrival]);

  useEffect(() => {
    const maxPriceParam = searchParams.get("maxprice");
    const airlineParam = searchParams.get("airline");
    const minDepartureParam = searchParams.get("mindeparture");
    const maxDepartureParam = searchParams.get("maxdeparture");
    const minArrivalParam = searchParams.get("minarrival");
    const maxArrivalParam = searchParams.get("maxarrival");

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLocalMaxPrice(maxPriceParam ? Number(maxPriceParam) < 0 ? 0 : Number(maxPriceParam) : metadata?.maxPrice ?? 0);
    setLocalAirline(airlineParam ?? undefined);
    setLocalMinDeparture(minDepartureParam ?? undefined);
    setLocalMaxDeparture(maxDepartureParam ?? undefined);
    setLocalMinArrival(minArrivalParam ?? undefined);
    setLocalMaxArrival(maxArrivalParam ?? undefined);

    validateLocal();
  }, [searchParams, metadata]);

  function applyFilters() {
    setIsApplyingFilter(true);
    if (!validateLocal()) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");
    params.set("maxprice", String(localMaxPrice));

    if (localAirline) params.set("airline", localAirline);
    else params.delete("airline");

    if (localMinDeparture) params.set("mindeparture", localMinDeparture);
    else params.delete("mindeparture");
    if (localMaxDeparture) params.set("maxdeparture", localMaxDeparture);
    else params.delete("maxdeparture");

    router.push(`?${params.toString()}`);
    console.log("dbg params after push/filter updt: ", window.location.href);
    setIsApplyingFilter(false);
  }

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

  // thereactselect punya
  // const airlineOptions = [
  //   { value: "", label: "All Airlines", description: "" },
  //   ...(metadata?.airlines.map(a => ({ value: a, label: a, description: "" })) || [])
  // ];

  return (
    <>
      {isFetching && !metadata && (
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
          <div className="px-6 pt-5 pb-3 rounded-3xl bg-white-900 row-span-3 h-100 flex flex-col">
            <div className="flex-1 overflow-y-auto space-y-8">
              <StyledTypography fontSizeInput={20} fontWeightInput="bold" sx={{ color: "var(--color-primary-500)" }} >
                Filters
              </StyledTypography>
              <div className="w-full flex flex-col">
                <div className="flex gap-x-2 items-center mb-2">
                  <StyledTypography fontSizeInput={16} fontWeightInput="bold">
                    Max. Price
                  </StyledTypography>
                  <StyledTypography fontSizeInput={14} fontWeightInput="normal" sx={{ bgcolor: 'var(--color-primary-500)', color: 'var(--color-white-900)', paddingX: 1.5, paddingY: 0.5, borderRadius: 4 }}>
                    Rp {localMaxPrice.toLocaleString('id-ID')}
                  </StyledTypography>
                </div>
                <div className="ms-4 me-16">
                  <MaxPriceSlider min={MIN_PRICE} max={MAX_PRICE} step={200000} onChange={(_, v) => setLocalMaxPrice(v as number)} value={localMaxPrice} defaultValue={0} marks={marks} valueLabelDisplay="auto" slots={{ valueLabel: StyledSliderLabel }} />
                  {validationErrors.maxprice && <p className="text-red-500 text-sm mt-1">{validationErrors.maxprice}</p>}
                </div>
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
            </div>
            <div className="border-t pt-3 border-accent-secondary-900 bg-white-900 flex justify-end">
              <button
                onClick={applyFilters}
                disabled={Object.keys(validationErrors).length > 0}
                className={`bg-primary-500 text-white-900 px-4 py-2.5 rounded-4xl font-bold hover:bg-primary-600 transition-colors shadow-md ${Object.keys(validationErrors).length > 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {(isTicketsFetching || isApplyingFilter) && (
                  <>
                    <span className="flex flex-row items-center gap-x-2">
                      <CircularProgress size="20px" sx={{ color: 'var(--color-white-900)' }} />
                      Applying
                    </span>
                  </>
                )}
                {!isTicketsFetching && !isApplyingFilter && (
                  `Apply Filters`
                )}
              </button>
            </div>
          </div >
        )
      }
    </>
  );
}

function StyledSliderLabel(props: SliderValueLabelProps) {
  const { children, value } = props;
  return (
    <Tooltip enterTouchDelay={0} placement="bottom" title={value}>
      {children}
    </Tooltip>
  );
}

const MaxPriceSlider = styled(Slider)({
  color: 'var(--color-primary-500)',
  height: 8,
  '& .MuiSlider-track': {
    border: 'none',
  },
  '& .MuiSlider-thumb': {
    height: 24,
    width: 24,
    backgroundColor: 'var(--color-white-900)',
    border: '2px solid currentColor',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: 'inherit',
    },
    '&::before': {
      display: 'none',
    },
  },
  '& .MuiSlider-valueLabel': {
    lineHeight: 1.2,
    fontSize: 12,
    background: 'unset',
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: '50% 50% 50% 0',
    backgroundColor: 'var(--color-primary-500)',
    transformOrigin: 'bottom left',
    transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
    '&::before': { display: 'none' },
    '&.MuiSlider-valueLabelOpen': {
      transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
    },
    '& > *': {
      transform: 'rotate(45deg)',
    },
  },
});