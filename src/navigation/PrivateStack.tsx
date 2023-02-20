import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {PrivateTabParamList} from './types';
import {HabitsScreen} from '../screens/HabitsScreen';

const Tab = createBottomTabNavigator<PrivateTabParamList>();

export const PrivateStack = (): JSX.Element => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="HabitsScreen" component={HabitsScreen} />
    </Tab.Navigator>
  );
};
