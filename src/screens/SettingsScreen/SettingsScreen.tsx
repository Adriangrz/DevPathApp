import React from 'react';
import {Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {styles} from './styles';

export const SettingsScreen = (): JSX.Element => {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.container}>
        <Text>settings screen</Text>
      </View>
    </SafeAreaView>
  );
};
