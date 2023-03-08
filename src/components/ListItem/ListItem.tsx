import React, {useState} from 'react';
import {Text, View} from 'react-native';

import {styles} from './styles';
import {Button} from '../Button';
import {useTheme} from '../../providers/ThemeProvider';
import {Todo} from '../../types/todo';
import {Habit} from '../../types/habit';

import {CheckBoxComponent} from '../CheckBoxComponent';

interface ListItemProps {
  onPress: () => void;
  onCheckBoxPress: (isChecked: boolean) => void;
  item: Habit | Todo;
  checkBoxTestId: string;
  itemTestId: string;
}

export const ListItem = ({
  onPress,
  onCheckBoxPress,
  item,
  checkBoxTestId,
  itemTestId,
}: ListItemProps): JSX.Element => {
  const [toggleCheckBox, setToggleCheckBox] = useState<boolean>(
    item.isCompleted,
  );
  const theme = useTheme();
  return (
    <View
      testID={itemTestId}
      style={[
        styles.item,
        {
          backgroundColor: item.isCompleted
            ? theme.palette.gray.light
            : theme.palette.white.main,
        },
      ]}>
      <Text>{item.name}</Text>
      <View style={styles.itemOptionsContainer}>
        {/* @ts-ignore */}
        <CheckBoxComponent
          testID={checkBoxTestId}
          disabled={false}
          value={toggleCheckBox}
          onValueChange={(newValue: boolean) => {
            setToggleCheckBox(newValue);
            onCheckBoxPress(newValue);
          }}
        />
        <Button title="Edit" onPress={onPress} />
      </View>
    </View>
  );
};
