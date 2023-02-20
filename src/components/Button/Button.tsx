import React from 'react';
import {Pressable, PressableProps, Text} from 'react-native';

import {styles} from './styles';

interface ButtonProps extends PressableProps {
  title: string;
}

export const Button = ({title, ...props}: ButtonProps): JSX.Element => {
  return (
    <Pressable style={styles.button} {...props}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};
