import React, {useMemo, useState} from 'react';
import {FlatList, SafeAreaView, Switch, View} from 'react-native';

import {styles} from './styles';
import {AddButton} from '../../components/AddButton';
import {HabitsStackScreenProps} from '../../navigation/types';
import {useSelector} from 'react-redux';
import {Habit} from '../../types/habit';
import {RootState} from '../../app/configureStore';
import {useTheme} from '../../providers/ThemeProvider';
import {ListItem} from '../../components/ListItem';

type Props = HabitsStackScreenProps<'Habits'>;

const filterHabitsByIsCompleted = (habits: Habit[], isCompleted: boolean) => {
  return habits.filter(element => element.isCompleted === isCompleted);
};

export const HabitsScreen = ({navigation}: Props): JSX.Element => {
  const habitsData = useSelector((state: RootState) => state.habits.habits);
  const theme = useTheme();
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
              item={item}
              onPress={() => navigation.navigate('HabitScreen')}
            />
          )}
          keyExtractor={item => item.id}
        />
      </View>
      <AddButton onPress={() => navigation.navigate('AddHabitScreen')} />
    </SafeAreaView>
  );
};
