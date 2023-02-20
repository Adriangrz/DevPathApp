import {StyleSheet} from 'react-native';

import {theme} from '../../providers/ThemeProvider/theme';

const BORDER_WIDTH = 1;

export const styles = StyleSheet.create({
  input: {
    alignSelf: 'stretch',
    borderColor: theme.palette.gray.main,
    borderRadius: theme.spacings.sm,
    borderWidth: BORDER_WIDTH,
    fontSize: theme.fontSizes.body,
    fontWeight: '400',
    marginBottom: theme.spacings.sm,
    padding: theme.spacings.base * 2,
  },
});
