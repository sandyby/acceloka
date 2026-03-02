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

export function fetchDataSimulated(duration: number = 2000) {
  return new Promise((resolve) => {
    console.log("simulation: fetching data...");
    setTimeout(() => {
      resolve({ message: "simulation: data fetched successfully!" });
    }, duration);
  });
}

export function getIconCategoryMapping(category: string, fontSizeInput: number | string = "36px", props = {}) {
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

export function TicketCardMapping({ ticket }: { ticket: AvailableTicketTypes }) {
  switch (ticket.ticketCategory) {
    case "flight":
      return <StyledFlightTicketCard ticket={ticket} />;
    case "hotel":
      return <StyledHotelTicketCard ticket={ticket} />;
    case "concert":
      return <StyledConcertTicketCard ticket={ticket} />;
    // case "movie":
    //   return <StyledMovieTicketCard ticket={ticket} />;
    // case "train":
    //   return <StyledTrainTicketCard ticket={ticket} />;
    // case "bus":
    //   return <StyledBusTicketCard ticket={ticket} />;
    // case "sea":
    //   return <StyledSeaTransportationTicketCard ticket={ticket} />;
    default:
      // This should never happen if types are correct, but good for safety
      console.warn(`Unknown ticket category: ${ticket.ticketCategory}`);
      return (
        <div className="p-4 bg-red-50 text-red-800 rounded-lg">
          {`The ticket category ${ticket.ticketCategory} doesn't exist!`}
        </div>
      );
  }
}
