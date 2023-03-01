import {Formik} from 'formik';
import React, {useCallback} from 'react';
import {KeyboardAvoidingView, Platform, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import * as Yup from 'yup';

import {Form} from '../../components/Form';
import {addTodo} from '../../features/todos/todosSlice';
import {TodosStackScreenProps} from '../../navigation/types';
import {Tag} from '../../types/tag';
import {styles} from './styles';

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
      style={styles.container}>
      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.container}>
          <Formik
            initialValues={TodoFormInitialValues}
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
