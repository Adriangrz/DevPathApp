import {StyleSheet} from 'react-native';

import {theme} from '../../providers/ThemeProvider/theme';

const BORDER_WIDTH = 1;

export const styles = StyleSheet.create({
  form: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  error: {
    color: theme.palette.red.main,
    alignSelf: 'stretch',
    textAlign: 'center',
  },
  addTagContainer: {
    flexDirection: 'row',
    marginBottom: theme.spacings.base,
  },
  tag: {
    borderColor: theme.palette.gray.main,
    borderRadius: theme.spacings.sm,
    borderWidth: BORDER_WIDTH,
    fontSize: theme.fontSizes.body,
    fontWeight: '400',
    padding: theme.spacings.base * 2,
    marginRight: theme.spacings.base,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tagText: {
    marginRight: theme.spacings.base,
  },
  deleteTagContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacings.sm,
    borderColor: theme.palette.gray.main,
    borderRadius: theme.spacings.sm,
    borderWidth: BORDER_WIDTH,
  },
  deleteTagText: {
    fontSize: theme.fontSizes.body,
    fontWeight: '400',
    lineHeight: theme.spacings.md,
    color: theme.palette.red.dark,
  },
  addTag: {
    flex: 1,
    marginBottom: 0,
  },
  tagsList: {
    marginBottom: theme.spacings.base,
  },
});
