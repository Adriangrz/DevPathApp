import React from 'react';
import {Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

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
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.container}>
        <Text>settings screen</Text>
      </View>
    </SafeAreaView>
  );
};
