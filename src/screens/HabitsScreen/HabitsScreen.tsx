import React from 'react';
import {Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {styles} from './styles';
import {LogOutButton} from '../../components/LogOutButton';

export const HabitsScreen = (): JSX.Element => {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.container}>
        <Text>habits screen</Text>
        <LogOutButton />
      </View>
    </SafeAreaView>
  );
};
