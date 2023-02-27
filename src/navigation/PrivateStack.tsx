import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {
  HabitsStackParamList,
  PrivateTabParamList,
  TodosStackParamList,
} from './types';
import {HabitsScreen} from '../screens/HabitsScreen';
import {TodosScreen} from '../screens/TodosScreen';
import {SettingsScreen} from '../screens/SettingsScreen';
import {AddHabitScreen} from '../screens/AddHabitScreen';
import {AddTodoScreen} from '../screens/AddTodoScreen';
import {HabitScreen} from '../screens/HabitScreen';
import {TodoScreen} from '../screens/TodoScreen';

const Tab = createBottomTabNavigator<PrivateTabParamList>();

const HabitsStack = createNativeStackNavigator<HabitsStackParamList>();
const TodosStack = createNativeStackNavigator<TodosStackParamList>();

const HabitsStackScreen = (): JSX.Element => {
  return (
    <HabitsStack.Navigator
      initialRouteName="Habits"
      screenOptions={{
        headerShadowVisible: false,
        headerBackTitleVisible: false,
      }}>
      <HabitsStack.Group>
        <HabitsStack.Screen name="Habits" component={HabitsScreen} />
      </HabitsStack.Group>
      <HabitsStack.Group screenOptions={{presentation: 'modal'}}>
        <HabitsStack.Screen
          options={{title: 'Add habit'}}
          name="AddHabitScreen"
          component={AddHabitScreen}
        />
        <HabitsStack.Screen
          options={{title: 'Habit'}}
          name="HabitScreen"
          component={HabitScreen}
        />
      </HabitsStack.Group>
    </HabitsStack.Navigator>
  );
};

const TodosStackScreen = (): JSX.Element => {
  return (
    <TodosStack.Navigator
      initialRouteName="Todos"
      screenOptions={{
        headerShadowVisible: false,
        headerBackTitleVisible: false,
      }}>
      <TodosStack.Group>
        <TodosStack.Screen name="Todos" component={TodosScreen} />
      </TodosStack.Group>
      <TodosStack.Group screenOptions={{presentation: 'modal'}}>
        <TodosStack.Screen
          options={{title: 'Add todo'}}
          name="AddTodoScreen"
          component={AddTodoScreen}
        />
        <TodosStack.Screen
          options={{title: 'Todo'}}
          name="TodoScreen"
          component={TodoScreen}
        />
      </TodosStack.Group>
    </TodosStack.Navigator>
  );
};

export const PrivateStack = (): JSX.Element => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        options={{headerShown: false}}
        name="HabitsStack"
        component={HabitsStackScreen}
      />
      <Tab.Screen
        options={{headerShown: false}}
        name="TodosStack"
        component={TodosStackScreen}
      />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};
