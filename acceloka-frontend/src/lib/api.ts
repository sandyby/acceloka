import { FlightTicketsQueryResponse } from "@/types/api";
import axios from "axios";
import { fetchDataSimulated } from "./utils";

export const fetchTicketsByCategory = async (
  activeCategory: string,
  currentPageNumber: number,
) => {
  const ticketCategoryParam =
    activeCategory === "flights"
      ? "transportation by air"
      : activeCategory === "hotels"
        ? "hotel accommodation"
        : activeCategory === "movies"
          ? "cinema"
          : activeCategory === "trains"
            ? "transportation by train"
            : activeCategory === "bus"
              ? "transportation by bus"
              : activeCategory === "sea-transportations"
                ? "transportation by sea"
                : "concert";

  await fetchDataSimulated(1200);

  const ticketsPerPage = 2;

  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL_DEV}/get-available-tickets?ticketcategory=${ticketCategoryParam}&pagenumber=${currentPageNumber || 1}&pagesize=${ticketsPerPage}`,
  );

  const data: FlightTicketsQueryResponse = response.data;
  return data;
};
