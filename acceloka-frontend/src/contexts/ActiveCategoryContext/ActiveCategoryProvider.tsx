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

  const value: ActiveCategoryContextType = {
    activeCategory,
    setActiveCategory,
  };

  return (
    <ActiveCategoryContext.Provider value={value}>
      {children}
    </ActiveCategoryContext.Provider>
  );
}