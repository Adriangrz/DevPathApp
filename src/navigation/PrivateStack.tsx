import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {PrivateTabParamList} from './types';
import {HabitsScreen} from '../screens/HabitsScreen';
import {TodosScreen} from '../screens/TodosScreen';
import {SettingsScreen} from '../screens/SettingsScreen';

const Tab = createBottomTabNavigator<PrivateTabParamList>();

export const PrivateStack = (): JSX.Element => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="HabitsScreen" component={HabitsScreen} />
      <Tab.Screen name="TodosScreen" component={TodosScreen} />
      <Tab.Screen name="SettingsScreen" component={SettingsScreen} />
    </Tab.Navigator>
  );
};
