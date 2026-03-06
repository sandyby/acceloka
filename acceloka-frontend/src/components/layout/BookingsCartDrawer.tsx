"use client";

import useBookingsCart from "@/hooks/useBookingsCart";
import { Button, Divider, Drawer, IconButton, Typography } from "@mui/material";
import StyledTypography from "@/components/ui/StyledTypography";
import { bgcolor, Box } from "@mui/system";
import { CloseRounded, ShoppingCartCheckoutRounded } from "@mui/icons-material";

export default function BookingsCartDrawer() {
    const { isBookingsCartOpen, closeBookingsCart } = useBookingsCart();

    return (
        <Drawer
            anchor="right"
            open={isBookingsCartOpen}
            onClose={closeBookingsCart}
            slotProps={{
                paper:
                {
                    sx: { width: { xs: '100%', sm: 450 }, height: '100%', borderTopLeftRadius: 48 }
                },
            }}
            sx={{
                zIndex: 999,
            }}
        >
            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <Box sx={{ p: 3, flexShrink: 0 }}>
                    <Box className="flex justify-between items-center">
                        <StyledTypography fontSizeInput={24} colorInput="white" fontWeightInput="bold"
                            sx={{
                                textTransform: "capitalize"
                            }}
                        >
                            Bookings Cart
                        </StyledTypography>
                        <IconButton className="close-drawer-button rounded-full" onClick={closeBookingsCart} sx={{
                            p: 1,
                            ":hover": {
                                bgcolor: "var(--color-white-900)",
                                borderRadius: "rounded-full",
                            }
                        }}>
                            <CloseRounded sx={{
                                color: "var(--color-white-900)",
                                fontSize: "24px",
                                ".close-drawer-button:hover &": {
                                    color: "var(--color-primary-500)",
                                }
                            }} />
                        </IconButton>
                    </Box>
                    <StyledTypography fontSizeInput={16} fontWeightInput="bold"
                        sx={{
                            textTransform: "capitalize",
                            color: "var(--color-accent-secondary-900)",
                        }}
                    >
                        Total tickets: 45
                    </StyledTypography>
                    {/* <Typography variant="body2" color="textSecondary">
                        Review your selected tickets before checkout.
                    </Typography> */}
                </Box>

                <Divider />

                <Box
                    sx={{
                        flexGrow: 1,
                        overflowY: 'auto',
                        p: 3,
                        backgroundColor: "var(--color-accent-quarternary-900)",
                    }}
                >
                    <div className="flex flex-col gap-4">
                        {[...Array(10)].map((_, i) => (
                            <div key={i} className="p-4 bg-white border border-gray-200 rounded-2xl shadow-sm">
                                <Typography fontWeight="bold">
                                    Flight Ticket #{i + 1}
                                </Typography>
                                <Typography variant="caption" color="textSecondary">
                                    Rp 1.250.000
                                </Typography>
                            </div>
                        ))}
                    </div>
                </Box>

                <Divider />

                <Box sx={{ p: 3, flexShrink: 0, bgcolor: "Var(--color-secondary-900)" }}>
                    <Button
                        fullWidth
                        variant="contained"
                        size="large"
                        startIcon={<ShoppingCartCheckoutRounded />}
                        sx={{
                            bgcolor: 'var(--color-primary-500)',
                            borderRadius: '12px',
                            py: 1.5,
                            fontWeight: 'bold',
                            '&:hover': { bgcolor: 'var(--color-primary-700)' }
                        }}
                    >
                        Confirm Bookings
                    </Button>
                </Box>
            </Box>
            {/* <Box
                className="px-4 pt-6 pb-3"
            >
                <Box
                    className="flex justify-between items-center mb-4 px-6 py-2 rounded-full bg-secondary-800"
                >
                    <StyledTypography fontSizeInput={24} colorInput="white" fontWeightInput="bold"
                        sx={{
                            textTransform: "capitalize"
                        }}
                    >
                        Bookings Cart
                    </StyledTypography>
                    <IconButton className="close-drawer-button rounded-full" onClick={closeBookingsCart} sx={{
                        p: 1,
                        ":hover": {
                            bgcolor: "var(--color-white-900)",
                            borderRadius: "rounded-full",
                        }
                    }}>
                        <CloseRounded sx={{
                            color: "var(--color-white-900)",
                            fontSize: "24px",
                            ".close-drawer-button:hover &": {
                                color: "var(--color-primary-500)",
                            }
                        }} />
                    </IconButton>
                </Box>
                <Box className="flex flex-col gap-y-4 bg-primary-50 overflow-y-scroll">
                    <Box>
                        {
                            [1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
                                <div key={idx} className="w-40 h-30 bg-red-50">

                                </div>
                            ))
                        }
                    </Box>
                </Box>
            </Box> */}
        </Drawer >
    )
}