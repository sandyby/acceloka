import { TicketsDataContext } from "@/contexts/TicketsDataContext";
import { useContext } from "react";

const useTicketsData = () => {
  const context = useContext(TicketsDataContext);
  if (!context)
    throw new Error("useTicketsData must be used inside the provider!");
  return context;
};

export default useTicketsData;
