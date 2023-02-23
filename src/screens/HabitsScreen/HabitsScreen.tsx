import React, {useMemo, useState} from 'react';
import {Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {styles} from './styles';
import {LogOutButton} from '../../components/LogOutButton';
import {AddButton} from '../../components/AddButton';
import {HabitsStackScreenProps} from '../../navigation/types';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../app/store';
import {addHabit} from '../../features/habits/habitsSlice';
import {Habit} from '../../types/habit';

type Props = HabitsStackScreenProps<'HabitsScreen'>;

const filterHabitsByIsCompleted = (habits: Habit[], isCompleted: boolean) => {
  return habits.filter(element => element.isCompleted === isCompleted);
};

export const HabitsScreen = ({navigation}: Props): JSX.Element => {
  const habitsData = useSelector((state: RootState) => state.habits.habits);
  const dispatch = useDispatch();
  const [completed, setCompleted] = useState<boolean>(false);

  const habits = useMemo(() => {
    if (habitsData) {
      return filterHabitsByIsCompleted(habitsData, completed);
    }
  }, [habitsData, completed]);

  console.log(habits);
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.container}>
        <Text>habits screen</Text>
        <LogOutButton />
        <AddButton
          onPress={() =>
            dispatch(addHabit({name: '1', tags: [], isCompleted: false}))
          }
        />
      </View>
    </SafeAreaView>
  );
};
