import { GetAvailableTicketQueryResponse } from "@/types/api";
import axios from "axios";
import { fetchDataSimulated } from "./utils";

export const fetchTicketsByCategory = async (
  activeCategory: string,
  currentPageNumber: number,
  pageSize: number,
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

  await fetchDataSimulated(1200);

  const ticketsPerPage = pageSize;

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL_DEV}/get-available-tickets`,
      {
        params: {
          ticketcategory: activeCategory ?? undefined,
          pagenumber: currentPageNumber,
          pagesize: ticketsPerPage,
        },
        signal: signal || controller.signal,
      },
    );
    clearTimeout(timeoutId);
    return response.data;
    // const data: GetAvailableTicketQueryResponse = response.data;
    // return data;
  } catch (err) {
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
