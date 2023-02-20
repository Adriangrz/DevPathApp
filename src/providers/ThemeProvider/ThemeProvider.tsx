import React from 'react';
import {createTheming} from '@callstack/react-theme-provider';

import {ThemeType} from '../../types/theme';
import {theme} from './theme';

type Props = {
  children: JSX.Element;
};

const {ThemeProvider: ReactThemeProvider, useTheme} =
  createTheming<ThemeType>(theme);

const ThemeProvider = ({children}: Props) => {
  // @ts-ignore
  return <ReactThemeProvider>{children}</ReactThemeProvider>;
};

export {ThemeProvider, useTheme};
