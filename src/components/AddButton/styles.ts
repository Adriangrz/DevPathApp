import {StyleSheet} from 'react-native';

import {theme} from '../../providers/ThemeProvider/theme';

const BORDER_RADIUS = 100;
const BUTTON_RIGHT = 5;
const BUTTON_BOTTOM = 10;

export const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: BUTTON_BOTTOM,
    right: BUTTON_RIGHT,
    backgroundColor: theme.palette.primary.main,
    borderRadius: BORDER_RADIUS,
    width: theme.spacings.lg * 2,
    height: theme.spacings.lg * 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: theme.palette.white.main,
    fontSize: theme.fontSizes.body,
    fontWeight: '700',
    lineHeight: theme.spacings.md,
  },
});
