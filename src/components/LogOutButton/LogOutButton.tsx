import React from 'react';
import {Pressable, PressableProps, Text} from 'react-native';

import {useAuth} from '../../contexts';
import {styles} from './styles';

export const LogOutButton = (props: PressableProps): JSX.Element => {
  const {logOut} = useAuth();

  return (
    <Pressable {...props} style={styles.button} onPress={logOut}>
      <Text style={styles.text}>Log out</Text>
    </Pressable>
  );
};
