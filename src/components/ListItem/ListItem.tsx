import React from 'react';
import {Text, View} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {useDispatch} from 'react-redux';

import {styles} from './styles';
import {Button} from '../Button';
import {editHabit} from '../../features/habits/habitsSlice';
import {useTheme} from '../../providers/ThemeProvider';
import {Todo} from '../../types/todo';
import {Habit} from '../../types/habit';

interface ListItemProps {
  onPress: () => void;
  item: Habit | Todo;
}

export const ListItem = ({onPress, item}: ListItemProps): JSX.Element => {
  const dispatch = useDispatch();
  const theme = useTheme();

  return (
    <View
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
        <BouncyCheckbox
          disableText={true}
          isChecked={item.isCompleted}
          onPress={(isChecked: boolean) => {
            dispatch(editHabit({...item, isCompleted: isChecked}));
          }}
        />
        <Button title="Edit" onPress={onPress} />
      </View>
    </View>
  );
};
