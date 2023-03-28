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
import {LogOutButton} from '../components/LogOutButton';

const Tab = createBottomTabNavigator<PrivateTabParamList>();

const HabitsStack = createNativeStackNavigator<HabitsStackParamList>();
const TodosStack = createNativeStackNavigator<TodosStackParamList>();

const HabitsStackScreen = (): JSX.Element => {
  return (
    <HabitsStack.Navigator initialRouteName="Habits">
      <HabitsStack.Group
        screenOptions={{
          headerRight: () => <LogOutButton />,
        }}>
        <HabitsStack.Screen name="Habits" component={HabitsScreen} />
      </HabitsStack.Group>
      <HabitsStack.Group
        screenOptions={{
          presentation: 'modal',
          headerShadowVisible: false,
          headerBackTitleVisible: false,
        }}>
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
    <TodosStack.Navigator initialRouteName="Todos">
      <TodosStack.Group
        screenOptions={{
          headerRight: () => <LogOutButton />,
        }}>
        <TodosStack.Screen name="Todos" component={TodosScreen} />
      </TodosStack.Group>
      <TodosStack.Group
        screenOptions={{
          presentation: 'modal',
          headerShadowVisible: false,
          headerBackTitleVisible: false,
        }}>
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
