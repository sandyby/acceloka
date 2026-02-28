"use client";

import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";

type TotalTicketsFilteredContextType = {
  totalTicketsCount: number | undefined;
  setTotalTicketsCount: Dispatch<SetStateAction<number>>;
  hasFiltered: boolean;
  setHasFiltered: Dispatch<SetStateAction<boolean>>;
};

export const TotalTicketsFilteredContext =
  createContext<TotalTicketsFilteredContextType>({
    totalTicketsCount: 0,
    setTotalTicketsCount: () => { },
    hasFiltered: false,
    setHasFiltered: () => { },
  });

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