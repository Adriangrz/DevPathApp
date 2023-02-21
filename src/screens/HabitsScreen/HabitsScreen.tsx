import React from 'react';
import {Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {styles} from './styles';
import {LogOutButton} from '../../components/LogOutButton';
import {AddButton} from '../../components/AddButton';
import {HabitsStackScreenProps} from '../../navigation/types';

type Props = HabitsStackScreenProps<'HabitsScreen'>;

export const HabitsScreen = ({navigation}: Props): JSX.Element => {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.container}>
        <Text>habits screen</Text>
        <LogOutButton />
        <AddButton onPress={() => navigation.navigate('AddHabitScreen')} />
      </View>
    </SafeAreaView>
  );
};
