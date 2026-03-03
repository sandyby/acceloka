import {
  GetAvailableTicketQueryResponse,
  TicketFilters,
  TicketMetadata,
} from "@/types/api";
import axios from "axios";
import { fetchDataSimulated } from "./utils";

export const fetchTicketsByCategory = async (
  activeCategory: string,
  currentPageNumber: number,
  pageSize: number,
  filters: TicketFilters = {},
  signal?: AbortSignal,
): Promise<GetAvailableTicketQueryResponse> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, 10000);

  const ticketCategoryParam = activeCategory;

  // activeCategory === "flights"
  //   ? "flights"
  //   : activeCategory === "hotels"
  //     ? "hotels"
  //     : activeCategory === "movies"
  //       ? "movies"
  //       : activeCategory === "trains"
  //         ? "trains"
  //         : activeCategory === "buses"
  //           ? "buses"
  //           : activeCategory === "sea-transportations"
  //             ? "sea-transportations"
  //             : "concert";

  // await fetchDataSimulated(1200);

  const ticketsPerPage = pageSize;

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL_DEV}/get-available-tickets`,
      {
        params: {
          ticketcategory: activeCategory ?? "flights",
          pagenumber: currentPageNumber,
          pagesize: ticketsPerPage,
          maxprice: filters.maxPrice,
          departurestart: filters.departureStart,
          departureend: filters.departureEnd,
          airline: filters.airline,
        },
        signal: signal || controller.signal,
      },
    );
    clearTimeout(timeoutId);
    return response.data;
  } catch (err) {
    console.error("fetching error: ", err)
    clearTimeout(timeoutId);
    if (axios.isCancel(err)) {
      throw new Error(
        "Request timed out after 10 seconds trying to fetch the API!",
      );
    }
    throw err;
  }
};

// ?ticketcategory=${ticketCategoryParam}&pagenumber=${currentPageNumber || 1}&pagesize=${ticketsPerPage}`,

export const fetchTicketMetadataByCategory = async (
  activeCategory: string,
  signal?: AbortSignal,
): Promise<TicketMetadata> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, 10000);

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL_DEV}/get-ticket-metadata`,
      {
        params: {
          ticketcategory: activeCategory ?? "flights",
        },
        signal: signal || controller.signal,
      },
    );
    clearTimeout(timeoutId);
    return response.data;
  } catch (err) {
    clearTimeout(timeoutId);
    if (axios.isCancel(err)) {
      throw new Error(
        "Request timed out after 10 seconds trying to fetch the metadata!",
      );
    }
    throw err;
  }
};
