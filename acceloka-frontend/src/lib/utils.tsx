import StyledBusTicketCard from "@/components/ui/cards/StyledBusTicketCard";
import StyledConcertTicketCard from "@/components/ui/cards/StyledConcertTicketCard";
import StyledFlightTicketCard from "@/components/ui/cards/StyledFlightTicketCard";
import StyledHotelTicketCard from "@/components/ui/cards/StyledHotelTicketCard";
import StyledMovieTicketCard from "@/components/ui/cards/StyledMovieTicketCard";
import StyledSeaTransportationTicketCard from "@/components/ui/cards/StyledSeaTransportationTicketCard";
import StyledTrainTicketCard from "@/components/ui/cards/StyledTrainTicketCard";
import DateTimeInput from "@/components/ui/DateTimeInput";
import MultiSelectDropdown from "@/components/ui/MultiSelectDropdown";
import MultiCheckboxGroup from "@/components/ui/MultiCheckboxGroup";
import { AvailableTicketTypes } from "@/types/card";
import { DEFAULT_FORMAT_DATETIME_OPTIONS, FormatDateTimeOptions } from "@/types/date";
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
import { add, differenceInMinutes } from "date-fns";


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
    case "buses":
      return <DirectionsBusRounded sx={{ fontSize: fontSizeInput }} {...props} />
    case "sea-transportations":
      return <DirectionsBoatRounded sx={{ fontSize: fontSizeInput }} {...props} />
    default:
      return <ConfirmationNumberRounded sx={{ fontSize: fontSizeInput }} {...props} />
  }
}

export function ticketCardMapper(ticket: AvailableTicketTypes, index: number) {
  switch (ticket.ticketCategory) {
    case "flights":
      return <StyledFlightTicketCard key={index} ticket={ticket} />;
    case "hotels":
      return <StyledHotelTicketCard key={index} ticket={ticket} />;
    case "concerts":
      return <StyledConcertTicketCard key={index} ticket={ticket} />;
    case "movies":
      return <StyledMovieTicketCard key={index} ticket={ticket} />;
    case "trains":
      return <StyledTrainTicketCard key={index} ticket={ticket} />;
    case "buses":
      return <StyledBusTicketCard key={index} ticket={ticket} />;
    case "sea-transportations":
      return <StyledSeaTransportationTicketCard key={index} ticket={ticket} />;
    default:
      console.warn(`Unknown ticket category: ${ticket.ticketCategory}`);
      return (
        <div key={index} className="p-4 bg-red-50 text-red-800 rounded-lg">
          {`The ticket category ${ticket.ticketCategory} doesn't exist!`}
        </div>
      );
  }
}

export function dateTimeFormatter(dateTimeInput: Date, localeInput?: string) {
  return dateTimeInput.toLocaleString(localeInput ?? 'en-US', { dateStyle: 'medium', timeStyle: 'short', });
}

export function formatDateTimeWithWords(date: Date, options: Partial<FormatDateTimeOptions> = {}): string {
  const opts = { ...DEFAULT_FORMAT_DATETIME_OPTIONS, ...options };
  let weekdayStr = '';
  if (opts.weekday !== 'none') {
    const weekdays = {
      narrow: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
      short: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      long: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    }[opts.weekday];
    weekdayStr = weekdays[date.getUTCDay()];
  }

  let monthStr = '';
  if (opts.month !== 'none') {
    const months = {
      numeric: (date.getUTCMonth() + 1).toString(),
      '2-digit': (date.getUTCMonth() + 1).toString().padStart(2, '0'),
      short: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][date.getUTCMonth()],
      long: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][date.getUTCMonth()],
    }[opts.month];
    monthStr = months;
  }

  const day = date.getUTCDate().toString();
  const year = opts.year === '2-digit' ? date.getUTCFullYear().toString().slice(-2)
    : opts.year === 'numeric' ? date.getUTCFullYear().toString()
      : '';

  let hours = date.getUTCHours();
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  let ampm = '';

  if (opts.hour12) {
    ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
  }

  if (!opts.hour12 && opts.showAMPM) {
    ampm = hours >= 12 ? 'PM' : 'AM';
  }

  const timeStr = `${hours.toString().padStart(2, '0')}:${minutes}${ampm ? ' ' + ampm : ''}`;

  const parts: string[] = [];
  if (weekdayStr) parts.push(weekdayStr);
  if (day) parts.push(day);
  if (monthStr) parts.push(monthStr);
  if (year) parts.push(year);

  const datePart = parts.join(' ');
  const finalSeparator = datePart && timeStr ? opts.separator : '';

  return datePart + finalSeparator + timeStr;
}

export function calculateArrivalTime(departureTimeInput: string, durationInput: string) {
  const departureTime = new Date(departureTimeInput);
  const [hours, minutes, seconds] = durationInput.split(":").map(Number);
  const duration = (hours * 60 * 60) + (minutes * 60) + seconds;
  const arrivalTime = add(departureTime, { seconds: duration });
  return formatDateTimeWithWords(arrivalTime, { weekday: "short", month: "short" });
}

export function calculateDuration(startDateInput: string, endDateInput: string) {
  const startDate = new Date(startDateInput);
  const endDate = new Date(endDateInput);
  const diffInMinutes = differenceInMinutes(endDate, startDate);

  const days = Math.ceil(diffInMinutes / (24 * 60));
  const nights = (days - 1) == 0 ? 1 : (days - 1);
  return `${days} ${days > 1 ? `days` : `day`} ${nights} ${nights > 1 ? `nights` : `night`}`;
}

export function durationFormatter(durationInput: string) {
  const [hours, minutes, seconds] = durationInput.split(":").map(Number);
  return { hours, minutes, seconds };
}

export function generateRandomDays(maxNumber: number) {
  return Math.ceil(Math.random() * (maxNumber ?? 5));
}


// export const FILTER_COMPONENTS: Record<
//   string,
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   (props: any) => Element
// > = {
//   airlines: (props) => (
//     <MultiSelectDropdown label="Airlines" {...props} />
//   ),
//   seatClasses: (props) => (
//     <MultiCheckboxGroup label="Seat Classes" {...props} />
//   ),
//   amenities: (props) => (
//     <MultiCheckboxGroup label="Amenities" {...props} />
//   ),
//   minDeparture: (props) => (
//     <DateTimeInput label="Min. Departure" {...props} />
//   ),
//   maxDeparture: (props) => (
//     <DateTimeInput label="Max. Departure" {...props} />
//   ),
//   // Add train/event/hotel components later:
// };

// function TrainTypeCheckbox(props: any): Element {
//   throw new Error("Function not implemented.");
// }


// function CabinCheckbox(props: any): Element {
//   throw new Error("Function not implemented.");
// }


// function VenueDropdown(props: any): Element {
//   throw new Error("Function not implemented.");
// }


// function PerformerDropdown(props: any): Element {
//   throw new Error("Function not implemented.");
// }
