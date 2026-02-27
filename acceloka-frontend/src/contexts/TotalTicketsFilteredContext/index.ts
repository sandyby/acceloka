"use client";

import { number } from "framer-motion";
import { createContext, Dispatch, SetStateAction } from "react";

export type TotalTicketsFilteredContextType = {
  totalTicketsCount: number | undefined;
  setTotalTicketsCount: Dispatch<SetStateAction<number>>;
  hasFiltered: boolean;
  setHasFiltered: Dispatch<SetStateAction<boolean>>;
};

const TotalTicketsFilteredContext =
  createContext<TotalTicketsFilteredContextType>({
    totalTicketsCount: 0,
    setTotalTicketsCount: () => {},
    hasFiltered: false,
    setHasFiltered: () => {},
  });

export default TotalTicketsFilteredContext;
