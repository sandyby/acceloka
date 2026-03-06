"use client";

import { createContext, Dispatch, SetStateAction } from "react";
import { useState, ReactNode } from "react";

interface BookingsCartContextType {
    isBookingsCartOpen: boolean,
    openBookingsCart: () => void;
    closeBookingsCart: () => void;
    lastAddedNewBookingItemTime: Date | number | undefined;
    triggerAddedToCartEffect: () => void;
};

export const BookingsCartContext = createContext<BookingsCartContextType | undefined>(undefined);

export function BookingsCartContextProvider({ children }: { children: ReactNode }) {
    const [isBookingsCartOpen, setIsBookingsCartOpen] = useState(false);
    const [lastAddedNewBookingItemTime, setLastAddedNewBookingItemTime] = useState(0);
    const openBookingsCart = () => setIsBookingsCartOpen(true);
    const closeBookingsCart = () => setIsBookingsCartOpen(false);
    const triggerAddedToCartEffect = () => setLastAddedNewBookingItemTime(Date.now());

    return (
        <BookingsCartContext.Provider value={{ isBookingsCartOpen, openBookingsCart, closeBookingsCart, lastAddedNewBookingItemTime, triggerAddedToCartEffect }}>
            {children}
        </BookingsCartContext.Provider>
    )
}