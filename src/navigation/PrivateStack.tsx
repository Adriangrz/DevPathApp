import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {HabitsStackParamList, PrivateTabParamList} from './types';
import {HabitsScreen} from '../screens/HabitsScreen';
import {TodosScreen} from '../screens/TodosScreen';
import {SettingsScreen} from '../screens/SettingsScreen';
import {AddHabitScreen} from '../screens/AddHabitScreen';
import {AddTodoScreen} from '../screens/AddTodoScreen';
import {HabitScreen} from '../screens/HabitScreen';
import {TodoScreen} from '../screens/TodoScreen';

const Tab = createBottomTabNavigator<PrivateTabParamList>();

const Stack = createNativeStackNavigator<HabitsStackParamList>();

const HabitsStackScreen = (): JSX.Element => {
  return (
    <Stack.Navigator
      initialRouteName="HabitsScreen"
      screenOptions={{
        headerShadowVisible: false,
        headerBackTitleVisible: false,
      }}>
      <Stack.Screen name="HabitsScreen" component={HabitsScreen} />
      <Stack.Group screenOptions={{presentation: 'modal'}}>
        <Stack.Screen name="AddHabitScreen" component={AddHabitScreen} />
        <Stack.Screen name="AddTodoScreen" component={AddTodoScreen} />
        <Stack.Screen name="TodoScreen" component={TodoScreen} />
        <Stack.Screen name="HabitScreen" component={HabitScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export const PrivateStack = (): JSX.Element => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Habits" component={HabitsStackScreen} />
      <Tab.Screen name="TodosScreen" component={TodosScreen} />
      <Tab.Screen name="SettingsScreen" component={SettingsScreen} />
    </Tab.Navigator>
  );
};
