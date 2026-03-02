"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { useContext, useEffect } from "react";
import { ActiveCategoryContext } from "@/contexts/ActiveCategoryContext";
import StyledLink from "@/components/ui/StyledLink";
import StyledMenuWrapper from "@/components/ui/StyledMenuWrapper";

const Menu = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentActiveCategory = searchParams.get("category") ?? "flights";
  const { setActiveCategory, setHasLoaded } = useContext(ActiveCategoryContext);

  useEffect(() => {
    setActiveCategory(currentActiveCategory);
    setHasLoaded(true);

    return (() => {
      setHasLoaded(false);
    })
  }, [currentActiveCategory])

  const menuItems = [
    { label: "Flights", category: "flights" },
    { label: "Hotels", category: "hotels" },
    { label: "Concerts", category: "concerts" },
    { label: "Movies", category: "movies" },
    { label: "Trains", category: "trains" },
    { label: "Buses", category: "buses" },
    { label: "Ferries & Ships", category: "sea-transportations" },
  ];

  const changeCategory = (category: string) => {
    router.replace(`/?category=${category}&page=1`);
  };

  return (
    <StyledMenuWrapper>
      {menuItems.map((item) => {
        const isActive = currentActiveCategory === item.category;

        return (
          <StyledLink
            key={item.category}
            onClick={() => {
              changeCategory(item.category);
            }}
            active={isActive}
          >
            {isActive && (
              <motion.div
                layoutId="activeTab"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  borderRadius: "24px",
                  backgroundColor: "var(--color-primary-500)",
                  zIndex: -1,
                }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              />
            )}
            {item.label}
          </StyledLink>
        );
      })}
    </StyledMenuWrapper>
  );
};

export default Menu;
