import { GetAvailableTicketQueryResponse } from "@/types/api";
import axios from "axios";
import { fetchDataSimulated } from "./utils";

export const fetchTicketsByCategory = async (
  activeCategory: string,
  currentPageNumber: number,
  pageSize: number,
) => {
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

  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL_DEV}/get-available-tickets?ticketcategory=${ticketCategoryParam}&pagenumber=${currentPageNumber || 1}&pagesize=${ticketsPerPage}`,
  );

  const data: GetAvailableTicketQueryResponse = response.data;
  return data;
};
