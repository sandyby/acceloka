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
