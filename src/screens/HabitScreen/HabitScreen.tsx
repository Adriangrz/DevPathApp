import React, {useCallback, useMemo} from 'react';
import {Formik} from 'formik';
import {KeyboardAvoidingView, Platform, View} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import * as Yup from 'yup';
import {useHeaderHeight} from '@react-navigation/elements';

import {RootState} from '../../app/configureStore';
import {editHabit} from '../../features/habits/habitsSlice';
import {HabitsStackScreenProps} from '../../navigation/types';
import {Tag} from '../../types/tag';
import {styles} from './styles';

import {HabitForm} from '../../components/HabitForm';

type HabitForm = {
  submitValues: HabitFormValues;
  setSubmitting: (isSubmitting: boolean) => void;
};

type Props = HabitsStackScreenProps<'HabitScreen'>;

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

export const HabitScreen = ({navigation, route}: Props): JSX.Element => {
  const {itemId} = route.params;
  const habit = useSelector((state: RootState) =>
    state.habitsReducer.habits.find(element => element.id === itemId),
  );
  const headerHeight = useHeaderHeight();
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();

  const habitFormInitialValues: HabitFormValues = useMemo(() => {
    return habit ? {name: habit.name, tags: habit.tags} : {name: '', tags: []};
  }, [habit]);

  const addHabitOnSubmit = useCallback(
    ({submitValues, setSubmitting}: HabitForm) => {
      if (!habit) {
        return;
      }
      dispatch(editHabit({...habit, ...submitValues}));

      navigation.goBack();
      setSubmitting(false);
    },
    [dispatch, navigation, habit],
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
