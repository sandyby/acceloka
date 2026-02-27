"use client";

import { createContext, Dispatch, SetStateAction } from "react";

export type ActiveCategoryContextType = {
  activeCategory: string;
  setActiveCategory: Dispatch<SetStateAction<string>>;
};

const ActiveCategoryContext = createContext<ActiveCategoryContextType>({
  activeCategory: "",
  setActiveCategory: () => {},
});

export default ActiveCategoryContext;
