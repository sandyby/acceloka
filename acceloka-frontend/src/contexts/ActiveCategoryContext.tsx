"use client";

import { createContext, Dispatch, SetStateAction } from "react";
import { useState, ReactNode } from "react";

export type ActiveCategoryContextType = {
  activeCategory: string,
  setActiveCategory: Dispatch<SetStateAction<string>>,
  hasLoaded:boolean,
  setHasLoaded: Dispatch<SetStateAction<boolean>>
};

export const ActiveCategoryContext = createContext<ActiveCategoryContextType>({
  activeCategory: "",
  setActiveCategory: () => {},
  hasLoaded: false,
  setHasLoaded: () => {}
});

export default function ActiveCategoryContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [activeCategory, setActiveCategory] = useState("");
  const [hasLoaded, setHasLoaded] = useState(false);

  const value: ActiveCategoryContextType = {
    activeCategory,
    setActiveCategory,
    hasLoaded,
    setHasLoaded
  };

  return (
    <ActiveCategoryContext.Provider value={value}>
      {children}
    </ActiveCategoryContext.Provider>
  );
}