import React from 'react';
import {Pressable, PressableProps, Text} from 'react-native';

import {styles} from './styles';

interface AddButtonProps extends PressableProps {}

export const AddButton = (props: AddButtonProps): JSX.Element => {
  return (
    <Pressable style={styles.button} {...props}>
      <Text style={styles.text}>+</Text>
    </Pressable>
  );
};
