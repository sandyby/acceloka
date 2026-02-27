"use client";

import { useState, ReactNode } from "react";
import TotalTicketsFilteredContext, {
  TotalTicketsFilteredContextType,
} from ".";

export default function TotalTicketsFilteredProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [totalTicketsCount, setTotalTicketsCount] = useState(0);
  const [hasFiltered, setHasFiltered] = useState(false);

  const value: TotalTicketsFilteredContextType = {
    totalTicketsCount,
    setTotalTicketsCount,
    hasFiltered,
    setHasFiltered
  };

  return (
    <TotalTicketsFilteredContext.Provider value={value}>
      {children}
    </TotalTicketsFilteredContext.Provider>
  );
}