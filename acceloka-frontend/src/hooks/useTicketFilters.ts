import { FilterType } from "@/lib/filters-schema";
import { TicketMetadata } from "@/types/api";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export function useFilters(metadata: TicketMetadata | undefined) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filterInput, setFilterInput] = useState<FilterType>({});

  const updateFilterInput = (key: keyof FilterType, value: string | number) => {
    setFilterInput((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    if (!metadata) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFilterInput({
      maxprice: Number(searchParams.get("maxprice")) || metadata.maxPrice,
      airlines: searchParams.getAll("airlines"),
      amenities: searchParams.getAll("amenities"),
      seatclasses: searchParams.getAll("seatclasses"),
    });
  }, [searchParams, metadata]);

  const apply = () => {
    //
  };
  const clear = () => {
    //
  };

  return { filterInput, updateFilterInput, apply, clear };
}
