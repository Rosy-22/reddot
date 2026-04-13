// src/config/theme.js
// Red Dot App Theme - Pink/Rose color palette matching the Figma designs

export const COLORS = {
  // Primary pinks
  primaryPink: '#F48FB1',
  darkPink: '#E91E63',
  deepPink: '#C2185B',
  lightPink: '#FCE4EC',
  softPink: '#F8BBD0',
  rosePink: '#F06292',

  // Maroon/Dark (for calendar screen)
  maroon: '#880E4F',
  darkMaroon: '#6D0A3B',

  // Accent
  white: '#FFFFFF',
  offWhite: '#FFF5F7',
  black: '#1A1A1A',
  grey: '#9E9E9E',
  lightGrey: '#E0E0E0',
  darkGrey: '#616161',

  // Functional
  periodRed: '#D32F2F',
  pmsYellow: '#FDD835',
  fertileGreen: '#66BB6A',

  // Transparent
  whiteTransparent: 'rgba(255, 255, 255, 0.3)',
  pinkTransparent: 'rgba(244, 143, 177, 0.5)',
  darkTransparent: 'rgba(0, 0, 0, 0.3)',
};

export const FONTS = {
  bold: { fontWeight: '700' },
  semiBold: { fontWeight: '600' },
  medium: { fontWeight: '500' },
  regular: { fontWeight: '400' },
  light: { fontWeight: '300' },
};

export const SIZES = {
  // Global sizes
  base: 8,
  small: 12,
  font: 14,
  medium: 16,
  large: 18,
  extraLarge: 24,
  xxl: 32,
  xxxl: 40,

  // Radius
  radiusSmall: 8,
  radius: 12,
  radiusLarge: 20,
  radiusRound: 50,
};

export default { COLORS, FONTS, SIZES };
