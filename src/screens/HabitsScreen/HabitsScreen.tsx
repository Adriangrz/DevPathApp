import React, {useMemo, useState} from 'react';
import {FlatList, SafeAreaView, Switch, View} from 'react-native';

import {styles} from './styles';
import {HabitsStackScreenProps} from '../../navigation/types';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../app/configureStore';
import {useTheme} from '../../providers/ThemeProvider';
import {editHabit} from '../../features/habits/habitsSlice';
import {filterHabitsByIsCompleted} from '../../utilities/filterHabitsByIsCompleted';

import {ListItem} from '../../components/ListItem';
import {AddButton} from '../../components/AddButton';

type Props = HabitsStackScreenProps<'Habits'>;

export const HabitsScreen = ({navigation}: Props): JSX.Element => {
  const theme = useTheme();
  const habitsData = useSelector(
    (state: RootState) => state.habitsReducer.habits,
  );
  const dispatch = useDispatch();
  const [showUnfinished, setShowUnfinished] = useState<boolean>(false);

  const habits = useMemo(() => {
    if (habitsData && showUnfinished) {
      return filterHabitsByIsCompleted(habitsData, false);
    } else {
      return habitsData;
    }
  }, [habitsData, showUnfinished]);

  const toggleSwitch = () => setShowUnfinished(previousState => !previousState);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.container}>
        <Switch
          style={styles.switch}
          trackColor={{
            false: theme.palette.black.main,
            true: theme.palette.primary.light,
          }}
          thumbColor={
            showUnfinished
              ? theme.palette.primary.main
              : theme.palette.white.main
          }
          ios_backgroundColor={theme.palette.black.main}
          onValueChange={toggleSwitch}
          value={showUnfinished}
        />
        <FlatList
          data={habits}
          renderItem={({item}) => (
            <ListItem
              itemTestId="habit"
              checkBoxTestId={`habit-${item.id}-checkbox`}
              item={item}
              onCheckBoxPress={(isChecked: boolean) => {
                dispatch(editHabit({...item, isCompleted: isChecked}));
              }}
              onPress={() =>
                navigation.navigate('HabitScreen', {itemId: item.id})
              }
            />
          )}
          keyExtractor={item => item.id}
        />
      </View>
      <AddButton onPress={() => navigation.navigate('AddHabitScreen')} />
    </SafeAreaView>
  );
};
