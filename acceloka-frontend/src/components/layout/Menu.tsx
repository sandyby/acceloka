"use client";

import { Link } from "@mui/material";
import { styled } from "@mui/system";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

const StyledMenuWrapper = styled("div")({
  position: "relative",
  display: "flex",
  gap: "24px",
  borderRadius: "40px",
  width: "fit-content",
  padding: "10px",
  backgroundColor: "var(--color-white-900)",
});

const StyledLink = styled(Link, {
  shouldForwardProp: (prop) => prop !== "active",
})<{ active?: boolean }>(({ active }) => ({
  position: "relative",
  padding: "8px 16px",
  cursor: "pointer",
  textWrap: "nowrap",
  textDecoration: "none",
  borderRadius: "42px",
  color: active ? "var(--color-white-900)" : "var(--color-secondary-900)",
  zIndex: 1,
  fontSize: 18,
  ...(active
    ? {}
    : {
        ":hover": {
          backgroundColor: "var(--color-primary-500)",
          color: "var(--color-white-900)",
        },
      }),
}));

const Menu = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category") ?? "flights";

  const menuItems = [
    { label: "Flights", category: "flights" },
    { label: "Hotels", category: "hotels" },
    { label: "Concerts", category: "concerts" },
    { label: "Movies", category: "movies" },
    { label: "Land Transportations", category: "land-transportations" },
    { label: "Sea Transportations", category: "sea-transportations" },
  ];

  const changeCategory = (category: string) => {
    router.replace(`/?category=${category}`);
  };

  return (
    <StyledMenuWrapper>
      {menuItems.map((item) => {
        const isActive = activeCategory === item.category;

        return (
          <StyledLink
            key={item.category}
            onClick={() => changeCategory(item.category)}
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
