export interface FormatDateTimeOptions {
  weekday?: "short" | "long" | "narrow" | "none";
  month?: "numeric" | "2-digit" | "short" | "long" | "none";
  year?: "numeric" | "2-digit" | "none";
  hour12?: boolean;
  showAMPM?: boolean;
  separator?: string;
}

export const DEFAULT_FORMAT_DATETIME_OPTIONS: Required<FormatDateTimeOptions> =
  {
    weekday: "long",
    month: "long",
    year: "numeric",
    hour12: false,
    showAMPM: true,
    separator: ", ",
  };
