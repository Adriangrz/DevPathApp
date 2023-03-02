import React from 'react';
import {Platform, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';

import {RootState} from '../../app/configureStore';
import {Habit} from '../../types/habit';
import {Todo} from '../../types/todo';
import {styles} from './styles';

const countCompletedTodos = (todos: Todo[]) => {
  return `${todos.filter(todo => todo.isCompleted === true).length}/${
    todos.length
  }`;
};

const countCompletedHabits = (habits: Habit[]) => {
  return `${habits.filter(habit => habit.isCompleted === true).length}/${
    habits.length
  }`;
};

export const SettingsScreen = (): JSX.Element => {
  const habits = useSelector((state: RootState) => state.habits.habits);

  const todos = useSelector((state: RootState) => state.todos.todos);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.container}>
        <Text style={styles.text}>
          {Platform.OS.toUpperCase()} is the best!
        </Text>

        <Text style={styles.text}>Todos: {countCompletedTodos(todos)}</Text>
        <Text style={styles.text}>Habits: {countCompletedHabits(habits)}</Text>
      </View>
    </SafeAreaView>
  );
};
