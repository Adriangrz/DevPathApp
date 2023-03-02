import React from 'react';
import {Text, View} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

import {styles} from './styles';
import {Button} from '../Button';
import {useTheme} from '../../providers/ThemeProvider';
import {Todo} from '../../types/todo';
import {Habit} from '../../types/habit';

interface ListItemProps {
  onPress: () => void;
  onCheckBoxPress: (isChecked: boolean) => void;
  item: Habit | Todo;
}

export const ListItem = ({
  onPress,
  onCheckBoxPress,
  item,
}: ListItemProps): JSX.Element => {
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
          onPress={onCheckBoxPress}
        />
        <Button title="Edit" onPress={onPress} />
      </View>
    </View>
  );
};
