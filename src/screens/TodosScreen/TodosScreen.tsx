import React, {useMemo, useState} from 'react';
import {FlatList, SafeAreaView, Switch, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {RootState} from '../../app/configureStore';
import {editTodo} from '../../features/todos/todosSlice';
import {TodosStackScreenProps} from '../../navigation/types';
import {useTheme} from '../../providers/ThemeProvider';
import {filterTodosByIsCompleted} from '../../utilities/filterTodosByIsCompleted';
import {styles} from './styles';

import {AddButton} from '../../components/AddButton';
import {ListItem} from '../../components/ListItem';

type Props = TodosStackScreenProps<'Todos'>;

export const TodosScreen = ({navigation}: Props): JSX.Element => {
  const todosData = useSelector((state: RootState) => state.todosReducer.todos);
  const dispatch = useDispatch();
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
    <SafeAreaView testID="todos-screen" style={styles.mainContainer}>
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
          testID="todos-list"
          data={todos}
          renderItem={({item}) => (
            <ListItem
              itemTestId="todo"
              checkBoxTestId={`todo-${item.id}-checkbox`}
              item={item}
              onPress={() =>
                navigation.navigate('TodoScreen', {itemId: item.id})
              }
              onCheckBoxPress={(isChecked: boolean) => {
                dispatch(editTodo({...item, isCompleted: isChecked}));
              }}
            />
          )}
          keyExtractor={item => item.id}
        />
      </View>
      <AddButton
        testID="add-todo-btn"
        onPress={() => navigation.navigate('AddTodoScreen')}
      />
    </SafeAreaView>
  );
};
