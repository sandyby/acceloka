export type UIFontWeights = "bold" | "normal";
export type UITypographyColors = "primary" | "secondary" | "white" | "accent";
export type UIBackgroundColors =
  | "primary"
  | "secondary"
  | "white"
  | "accent-primary"
  | "accent-secondary"
  | "accent-tertiary"
  | "accent-quaternary";
export type UIVariants = "primary" | "secondary" | "accent" | "disabled";
export type UIStates = "active" | "default" | "hover" | "disabled";
export type UITypographySizes =
  | 64
  | 48
  | 36
  | 32
  | 28
  | 24
  | 20
  | 18
  | 16
  | 14
  | 12;

export interface UIInputBaseProps {
  label: string;
  value: string | number | undefined;
  onChange: (val: string) => void;
  placeholder?: string;
}
