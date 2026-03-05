"use client";

import { createContext, Dispatch, SetStateAction } from "react";
import { useState, ReactNode } from "react";

export type ScrollToTopType = {
    hasToScrollToTop: boolean,
    setHasToScrollToTop: Dispatch<SetStateAction<boolean>>,
};

export const ScrollToTopContext = createContext<ScrollToTopType>({
    hasToScrollToTop: false,
    setHasToScrollToTop: () => { },
});

export default function ScrollToTopContextProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [hasToScrollToTop, setHasToScrollToTop] = useState(false);

    const value: ScrollToTopType = {
        hasToScrollToTop,
        setHasToScrollToTop,
    };

    return (
        <ScrollToTopContext.Provider value={value}>
            {children}
        </ScrollToTopContext.Provider>
    );
}