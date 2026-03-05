import { ScrollToTopContext } from "./../contexts/ScrollToTopContext";
import { useContext } from "react";

const useScrollToTop = () => {
  const context = useContext(ScrollToTopContext);
  if (!context)
    throw new Error("useScrollToTop must be used inside the provider!");
  return context;
};

export default useScrollToTop;
