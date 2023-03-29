import React, {useCallback} from 'react';
import {Formik} from 'formik';
import {KeyboardAvoidingView, Platform, View} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import * as Yup from 'yup';
import {useHeaderHeight} from '@react-navigation/elements';

import {addTodo} from '../../features/todos/todosSlice';
import {TodosStackScreenProps} from '../../navigation/types';
import {Tag} from '../../types/tag';
import {styles} from './styles';

import {TodoForm} from '../../components/TodoForm';

type AddTodoForm = {
  submitValues: TodoFormValues;
  setSubmitting: (isSubmitting: boolean) => void;
};

type Props = TodosStackScreenProps<'AddTodoScreen'>;

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

export const AddTodoScreen = ({navigation}: Props): JSX.Element => {
  const headerHeight = useHeaderHeight();
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const TodoFormInitialValues: TodoFormValues = {name: '', tags: []};

  const addTodoOnSubmit = useCallback(
    ({submitValues, setSubmitting}: AddTodoForm) => {
      dispatch(addTodo({...submitValues, isCompleted: false}));
      navigation.goBack();
      setSubmitting(false);
    },
    [dispatch, navigation],
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={headerHeight + insets.bottom}>
      <SafeAreaView testID="add-todo-screen" style={styles.mainContainer}>
        <View style={styles.container}>
          <Formik
            initialValues={TodoFormInitialValues}
            validationSchema={TodoSchema}
            onSubmit={(values, {setSubmitting}) => {
              addTodoOnSubmit({submitValues: values, setSubmitting});
            }}>
            <TodoForm />
          </Formik>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};
