import {StyleSheet} from 'react-native';

import {theme} from '../../providers/ThemeProvider/theme';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: theme.spacings.md,
  },
  container: {
    flex: 1,
  },
  switch: {
    alignSelf: 'flex-end',
    marginVertical: theme.spacings.base,
  },
});
