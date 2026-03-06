import { BookingsCartContext } from "@/contexts/BookingsCartContext";
import { useContext } from "react";

const useBookingsCart = () => {
  const context = useContext(BookingsCartContext);
  if (!context) {
    throw new Error("useBookingsCart must be used inside the provider!");
  }
  return context;
};

export default useBookingsCart;
