export type PaletteColor = {
  dark?: string;
  main: string;
  light?: string;
};

type ThemePalette = {
  [key: string]: PaletteColor;
};

type ThemeFontSizes = {
  body: number;
  bodyLarge: number;
  bodySmall: number;
  h1: number;
  h2: number;
  h3: number;
  h4: number;
};

type ThemeSpacings = {
  sm: number;
  base: number;
  md: number;
  lg: number;
};

export type ThemeType = {
  palette: ThemePalette;
  fontSizes: ThemeFontSizes;
  spacings: ThemeSpacings;
};
