import {StyleSheet} from 'react-native';

import {theme} from '../../providers/ThemeProvider/theme';

const BORDER_WIDTH = 1;

export const styles = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: theme.palette.gray.main,
    borderRadius: theme.spacings.sm,
    borderWidth: BORDER_WIDTH,
    marginBottom: theme.spacings.sm,
    padding: theme.spacings.base * 2,
  },
  itemOptionsContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: theme.spacings.base,
  },
});
