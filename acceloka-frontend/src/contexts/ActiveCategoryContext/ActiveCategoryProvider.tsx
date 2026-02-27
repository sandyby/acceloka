"use client";

import { useState, ReactNode } from "react";
import ActiveCategoryContext, {
  ActiveCategoryContextType,
} from ".";

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