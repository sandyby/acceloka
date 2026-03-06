"use client";

import useBookingsCart from "@/hooks/useBookingsCart";
import { BookOnlineRounded } from "@mui/icons-material";
import { Tooltip, Badge, Box } from "@mui/material";
import { motion } from "framer-motion";

export default function BookingButton() {
    const { openBookingsCart } = useBookingsCart();

    // ? temporary! harus pake state in a context nanti
    const cartCount = 100;

    return (
        <Box
            component={motion.div}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.5 }}
            className="fixed top-12 right-6"
        >
            <Tooltip
                title="View Bookings Cart"
                placement="left"
                arrow
                disableInteractive
                slotProps={{
                    tooltip: {
                        sx: {
                            bgcolor: "var(--color-primary-500)",
                            color: "var(--color-white-900)",
                            fontWeight: "bold",
                            fontSize: "12px",
                            padding: "8px 12px",
                            borderRadius: "10px",
                            boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                            "& .MuiTooltip-arrow": {
                                color: "var(--color-primary-500)",
                            },
                        },
                    },
                    popper: {
                        modifiers: [
                            {
                                name: 'offset',
                                options: {
                                    offset: [0, 2],
                                },
                            },
                        ],
                    },
                }}
            >
                <button
                    onClick={openBookingsCart}
                    className="group p-2.5 rounded-full bg-primary-500 hover:bg-white-900
                                transition-all duration-250 cursor-pointer shadow-lg active:scale-95"
                >

                    <Badge
                        badgeContent={cartCount}
                        showZero
                        anchorOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                        max={99}
                        sx={{
                            "& .MuiBadge-badge": {
                                bgcolor: "var(--color-white-900)",
                                color: "var(--color-primary-500)",
                                fontSize: "0.75rem",
                                fontWeight: "bold",
                                padding: "auto",
                                border: "2px solid var(--color-primary-500)",
                                transition: "all 0.3s ease",
                                ".group:hover &": {
                                    borderColor: "var(--color-white-900)",
                                    bgcolor: "var(--color-primary-500)",
                                    color: "var(--color-white-900)",
                                }
                            }
                        }}
                    >
                        <BookOnlineRounded
                            sx={{
                                fontSize: "36px",
                                color: "var(--color-white-900)",
                                transition: "color 0.3s ease",
                                ".group:hover &": {
                                    color: "var(--color-primary-500)"
                                }
                            }}
                        />
                    </Badge>
                </button>
            </Tooltip>
        </Box>
    );
}