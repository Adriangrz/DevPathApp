import {Formik} from 'formik';
import React, {useCallback, useMemo} from 'react';
import {KeyboardAvoidingView, Platform, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import * as Yup from 'yup';

import {RootState} from '../../app/configureStore';
import {Form} from '../../components/Form';
import {editTodo} from '../../features/todos/todosSlice';
import {TodosStackScreenProps} from '../../navigation/types';
import {Tag} from '../../types/tag';
import {styles} from './styles';

type TodoForm = {
  submitValues: TodoFormValues;
  setSubmitting: (isSubmitting: boolean) => void;
};

type Props = TodosStackScreenProps<'TodoScreen'>;

const TodoSchema = Yup.object().shape({
  name: Yup.string()
    .required('Required')
    .min(3, 'Must have at least 3 letters'),
  tags: Yup.array(),
});

interface TodoFormValues {
  name: string;
  tags: Tag[];
}

export const TodoScreen = ({navigation, route}: Props): JSX.Element => {
  const {itemId} = route.params;
  const todo = useSelector((state: RootState) =>
    state.todos.todos.find(element => element.id === itemId),
  );
  const dispatch = useDispatch();

  const todoFormInitialValues: TodoFormValues = useMemo(() => {
    return todo ? {name: todo.name, tags: todo.tags} : {name: '', tags: []};
  }, [todo]);

  const addTodoOnSubmit = useCallback(
    ({submitValues, setSubmitting}: TodoForm) => {
      if (!todo) {
        return;
      }
      dispatch(editTodo({...todo, ...submitValues}));

      navigation.goBack();
      setSubmitting(false);
    },
    [dispatch, navigation, todo],
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.container}>
          <Formik
            initialValues={todoFormInitialValues}
            validationSchema={TodoSchema}
            onSubmit={(values, {setSubmitting}) => {
              addTodoOnSubmit({submitValues: values, setSubmitting});
            }}>
            {() => <Form />}
          </Formik>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};
