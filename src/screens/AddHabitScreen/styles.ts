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
  addHabitForm: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  error: {
    color: theme.palette.red.main,
    alignSelf: 'stretch',
    textAlign: 'center',
  },
});
