import React from 'react';
import {Platform, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';

import {RootState} from '../../app/configureStore';
import {countCompletedHabits} from '../../utilities/countCompletedHabits';
import {countCompletedTodos} from '../../utilities/countCompletedTodos';
import {styles} from './styles';

export const SettingsScreen = (): JSX.Element => {
  const habits = useSelector((state: RootState) => state.habitsReducer.habits);
  const todos = useSelector((state: RootState) => state.todosReducer.todos);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.container}>
        <Text style={styles.text}>
          {Platform.OS.toUpperCase()} is the best!
        </Text>

        <Text style={styles.text}>
          Todos: {`${countCompletedTodos(todos)}/${todos.length}`}
        </Text>
        <Text style={styles.text}>
          Habits: {`${countCompletedHabits(habits)}/${habits.length}`}
        </Text>
      </View>
    </SafeAreaView>
  );
};
