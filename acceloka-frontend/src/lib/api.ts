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

  await fetchDataSimulated(1000); // ! for ux testing purposes

  const ticketsPerPage = pageSize;

  try {
    console.log(
      `dbg start fetchticketsbycategory: ${activeCategory}, params:
      mindeparture: ${filters.mindeparture},
      maxdeparture: ${filters.maxdeparture},
      minarrival: ${filters.minarrival},
      maxarrival: ${filters.maxarrival},
      mincheckin: ${filters.mincheckin},
      maxcheckout: ${filters.maxcheckout},
      airlines: ${filters.airlines},
      seatclasses: ${filters.seatclasses},
      hotelnames: ${filters.hotelnames},
      roomtypes: ${filters.roomtypes},
      amenities: ${filters.amenities},
      maxprice: ${filters.maxprice},
      maxoccupancy: ${filters.maxoccupancy},
      `,
    );

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL_DEV}/get-available-tickets`,
      {
        params: {
          ticketcategory: activeCategory ?? "flights",
          pagenumber: currentPageNumber,
          pagesize: ticketsPerPage,
          maxprice: filters.maxprice,
          maxoccupancy: filters.maxoccupancy,
          mindeparture: filters.mindeparture,
          maxdeparture: filters.maxdeparture,
          minarrival: filters.minarrival,
          maxarrival: filters.maxarrival,
          mincheckin: filters.mincheckin,
          maxcheckout: filters.maxcheckout,
          airlines: filters.airlines,
          seatclasses: filters.seatclasses,
          hotelnames: filters.hotelnames,
          roomtypes: filters.roomtypes,
          amenities: filters.amenities,
        },
        paramsSerializer: {
          indexes: null,
        },
        signal: signal || controller.signal,
      },
    );
    clearTimeout(timeoutId);
    return response.data;
  } catch (err) {
    console.error("fetchticketsbycategory error: ", err);
    clearTimeout(timeoutId);
    if (axios.isCancel(err)) {
      throw new Error(
        "Request timed out after 10 seconds trying to fetch the API!",
      );
    }
    throw err;
  }
};

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
