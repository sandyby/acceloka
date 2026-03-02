import StyledConcertTicketCard from "@/components/ui/cards/StyledConcertTicketCard";
import StyledFlightTicketCard from "@/components/ui/cards/StyledFlightTicketCard";
import StyledHotelTicketCard from "@/components/ui/cards/StyledHotelTicketCard";
import { AvailableTicketTypes } from "@/types/card";
import {
  AirplaneTicketRounded,
  ApartmentRounded,
  ConfirmationNumberRounded,
  MusicNoteRounded,
  TrainRounded,
  DirectionsBusRounded,
  DirectionsBoatRounded,
  TheatersRounded,
} from "@mui/icons-material";
import { format, add } from "date-fns";


export function fetchDataSimulated(duration: number = 2000) {
  return new Promise((resolve) => {
    console.log("simulation: fetching data...");
    setTimeout(() => {
      resolve({ message: "simulation: data fetched successfully!" });
    }, duration);
  });
}

export function iconCategoryMapper(category: string, fontSizeInput: number | string = "36px", props = {}) {
  switch (category.toLowerCase()) {
    case "flights":
      return <AirplaneTicketRounded sx={{ fontSize: fontSizeInput }} {...props} />
    case "hotels":
      return <ApartmentRounded sx={{ fontSize: fontSizeInput }} {...props} />
    case "movies":
      return <TheatersRounded sx={{ fontSize: fontSizeInput }} {...props} />
    case "concerts":
      return <MusicNoteRounded sx={{ fontSize: fontSizeInput }} {...props} />
    case "trains":
      return <TrainRounded sx={{ fontSize: fontSizeInput }} {...props} />
    case "bus":
      return <DirectionsBusRounded sx={{ fontSize: fontSizeInput }} {...props} />
    case "sea-transportations":
      return <DirectionsBoatRounded sx={{ fontSize: fontSizeInput }} {...props} />
    default:
      return <ConfirmationNumberRounded sx={{ fontSize: fontSizeInput }} {...props} />
  }
}

export function ticketCardMapper(ticket: AvailableTicketTypes) {
  switch (ticket.ticketCategory) {
    case "flights":
      return <StyledFlightTicketCard ticket={ticket} />;
    case "hotels":
      return <StyledHotelTicketCard ticket={ticket} />;
    case "concerts":
      return <StyledConcertTicketCard ticket={ticket} />;
    // case "movies":
    //   return <StyledMovieTicketCard ticket={ticket} />;
    // case "trains":
    //   return <StyledTrainTicketCard ticket={ticket} />;
    // case "buses":
    //   return <StyledBusTicketCard ticket={ticket} />;
    // case "sea-transportations":
    //   return <StyledSeaTransportationTicketCard ticket={ticket} />;
    default:
      console.warn(`Unknown ticket category: ${ticket.ticketCategory}`);
      return (
        <div className="p-4 bg-red-50 text-red-800 rounded-lg">
          {`The ticket category ${ticket.ticketCategory} doesn't exist!`}
        </div>
      );
  }
}

export function calculateArrivalTime(departureTimeInput: string, durationInput: string) {
  const departureTime = new Date(departureTimeInput);
  const [hours, minutes, seconds] = durationInput.split(":").map(Number);
  const duration = (hours * 60 * 60) + (minutes * 60) + seconds;
  const arrivalTime = add(departureTime, { seconds: duration });
  return dateTimeFormatter(arrivalTime);
}

export function dateTimeFormatter(dateTimeInput: Date) {
  return dateTimeInput.toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' });
}

export function durationFormatter(durationInput: string) {
  const [hours, minutes, seconds] = durationInput.split(":").map(Number);
  return { hours, minutes, seconds };
}