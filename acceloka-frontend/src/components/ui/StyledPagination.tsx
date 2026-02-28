"use client";

import { Pagination } from "@mui/material"
import { alignItems, justifyContent, styled, textAlign, width } from "@mui/system"
import { color } from "framer-motion";

const StyledPagination = styled(Pagination)(() => ({
    display: "flex",
    justifyContent: "center",
    width: "fit-content",
    placeSelf: "center",
    borderRadius: "180px",

    "& .MuiPaginationItem-root": {
        fontSize: "1.25rem",
        color: "var(--color-secondary-900)",
        borderRadius: "8px",
    },

    "& .MuiPaginationItem-root.Mui-selected": {
        backgroundColor: "var(--color-primary-500)",
        color: "white",
        fontWeight: 600,
    },

    "& .MuiPaginationItem-root.Pagination-ul": {
        color: "white",
        fontWeight: 600,
        "> li": {
            fontSize: "24px",
            color: "black"
        }
    },

    "& .MuiPaginationItem-icon": {
        fontSize: "32px"
    },

    "& .MuiPaginationItem-root:hover": {
        backgroundColor: "var(--color-primary-50)",
    }
}));

export default StyledPagination