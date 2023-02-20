import React from 'react';
import {ActivityIndicator, View} from 'react-native';

import {useTheme} from '../../providers/ThemeProvider';
import {styles} from './styles';

export const LoadingIndicator = (): JSX.Element => {
  const theme = useTheme();

  return (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size="large" color={theme.palette.primary.main} />
    </View>
  );
};
