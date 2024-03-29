import React, {useCallback} from 'react';
import {Formik} from 'formik';
import {KeyboardAvoidingView, Platform, View} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import * as Yup from 'yup';
import {useHeaderHeight} from '@react-navigation/elements';

import {HabitsStackScreenProps} from '../../navigation/types';
import {styles} from './styles';
import {Tag} from '../../types/tag';
import {useDispatch} from 'react-redux';
import {addHabit} from '../../features/habits/habitsSlice';

import {HabitForm} from '../../components/HabitForm';

type AddHabitForm = {
  submitValues: HabitFormValues;
  setSubmitting: (isSubmitting: boolean) => void;
};

type Props = HabitsStackScreenProps<'AddHabitScreen'>;

const HabitSchema = Yup.object().shape({
  name: Yup.string()
    .required('Required')
    .min(3, 'Must have at least 3 letters'),
  tags: Yup.array(),
});

interface HabitFormValues {
  name: string;
  tags: Tag[];
}

export const AddHabitScreen = ({navigation}: Props): JSX.Element => {
  const headerHeight = useHeaderHeight();
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const habitFormInitialValues: HabitFormValues = {name: '', tags: []};

  const addHabitOnSubmit = useCallback(
    ({submitValues, setSubmitting}: AddHabitForm) => {
      dispatch(addHabit({...submitValues, isCompleted: false}));
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
      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.container}>
          <Formik
            initialValues={habitFormInitialValues}
            validationSchema={HabitSchema}
            onSubmit={(values, {setSubmitting}) => {
              addHabitOnSubmit({submitValues: values, setSubmitting});
            }}>
            <HabitForm />
          </Formik>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};
