"use client";

import { createContext, Dispatch, SetStateAction } from "react";

export type ActiveCategoryContextType = {
  activeCategory: string,
  setActiveCategory: Dispatch<SetStateAction<string>>,
  hasLoaded:boolean,
  setHasLoaded: Dispatch<SetStateAction<boolean>>
};

const ActiveCategoryContext = createContext<ActiveCategoryContextType>({
  activeCategory: "",
  setActiveCategory: () => {},
  hasLoaded: false,
  setHasLoaded: () => {},
});

export default ActiveCategoryContext;
