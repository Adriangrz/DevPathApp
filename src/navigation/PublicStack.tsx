import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import {PublicStackParamList} from './types';
import {LoginScreen} from '../screens/LoginScreen';
import {RegisterScreen} from '../screens/RegisterScreen';

const Stack = createNativeStackNavigator<PublicStackParamList>();

export const PublicStack = (): JSX.Element => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShadowVisible: false,
        headerBackTitleVisible: false,
      }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};
