import React from 'react';
import {TextInput, TextInputProps} from 'react-native';

import {styles} from './styles';

interface InputProps extends TextInputProps {
  innerRef?: React.RefObject<TextInput>;
}

export const Input = ({innerRef, style, ...props}: InputProps): JSX.Element => {
  return <TextInput ref={innerRef} {...props} style={[styles.input, style]} />;
};
