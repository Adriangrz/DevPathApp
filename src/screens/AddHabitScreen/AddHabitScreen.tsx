import React from 'react';
import {Button, Text, View} from 'react-native';
import {HabitsStackScreenProps} from '../../navigation/types';

import {styles} from './styles';

type Props = HabitsStackScreenProps<'AddHabitScreen'>;

export const AddHabitScreen = ({navigation}: Props): JSX.Element => {
  return (
    <View style={styles.container}>
      <Text>add habit modal</Text>
      <Button onPress={() => navigation.goBack()} title="Dismiss" />
    </View>
  );
};
