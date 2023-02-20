import {Theme, DefaultTheme} from '@react-navigation/native';

import {theme} from './theme';

export const NavigationTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: theme.palette.white.main,
  },
};
