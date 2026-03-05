import { TicketMetadataContext } from "@/contexts/TicketMetadataContext";
import { useContext } from "react";

const useTicketMetadata = () => {
  const context = useContext(TicketMetadataContext);
  if (!context)
    throw new Error("useTicketMetadata must be used inside the provider!");
  return context;
};

export default useTicketMetadata;
