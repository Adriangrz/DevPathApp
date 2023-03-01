import React, {useMemo, useState} from 'react';
import {FlatList, Switch, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';

import {RootState} from '../../app/configureStore';
import {AddButton} from '../../components/AddButton';
import {ListItem} from '../../components/ListItem';
import {TodosStackScreenProps} from '../../navigation/types';
import {useTheme} from '../../providers/ThemeProvider';
import {Todo} from '../../types/todo';

import {styles} from './styles';

type Props = TodosStackScreenProps<'Todos'>;

const filterTodosByIsCompleted = (todos: Todo[], isCompleted: boolean) => {
  return todos.filter(element => element.isCompleted === isCompleted);
};

export const TodosScreen = ({navigation}: Props): JSX.Element => {
  const todosData = useSelector((state: RootState) => state.todos.todos);
  const theme = useTheme();
  const [showUnfinished, setShowUnfinished] = useState<boolean>(false);

  const todos = useMemo(() => {
    if (todosData && showUnfinished) {
      return filterTodosByIsCompleted(todosData, false);
    } else {
      return todosData;
    }
  }, [todosData, showUnfinished]);

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
          data={todos}
          renderItem={({item}) => (
            <ListItem
              item={item}
              onPress={() =>
                navigation.navigate('TodoScreen', {itemId: item.id})
              }
            />
          )}
          keyExtractor={item => item.id}
        />
        <AddButton onPress={() => navigation.navigate('AddTodoScreen')} />
      </View>
    </SafeAreaView>
  );
};
