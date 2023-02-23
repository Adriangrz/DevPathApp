import {Formik} from 'formik';
import React, {useCallback, useState} from 'react';
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import * as Yup from 'yup';

import {HabitsStackScreenProps} from '../../navigation/types';
import {Habit} from '../../types/habit';
import {Tag} from '../../types/tag';
import {styles} from './styles';
import {Input} from '../../components/Input';
import {Button} from '../../components/Button';

type AddHabitForm = {
  SubmitValues: {name: string};
  setSubmitting: (isSubmitting: boolean) => void;
};

type Props = HabitsStackScreenProps<'AddHabitScreen'>;

const HabitSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
});

export const AddHabitScreen = ({navigation}: Props): JSX.Element => {
  const dispatch = useDispatch();
  const [habit, setHabits] = useState<Habit>();
  const [tags, setTags] = useState<Tag[]>([]);

  const addHabit = useCallback(
    ({SubmitValues, setSubmitting}: AddHabitForm) => {},
    [],
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.mainContainer}>
          <View style={styles.container}>
            <Formik
              initialValues={{name: ''}}
              validationSchema={HabitSchema}
              onSubmit={(values, {setSubmitting}) => {
                addHabit({SubmitValues: values, setSubmitting});
              }}>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
              }) => (
                <View style={styles.addHabitForm}>
                  <Input
                    onChangeText={handleChange('nam')}
                    onBlur={handleBlur('name')}
                    value={values.name}
                    placeholder="name"
                    autoCapitalize="none"
                    returnKeyType="next"
                  />
                  {errors.name && touched.name ? (
                    <Text style={styles.error}>{errors.name}</Text>
                  ) : null}
                  <FlatList
                    data={tags}
                    renderItem={({item}) => (
                      <View>
                        <Text>{item.name}</Text>
                      </View>
                    )}
                    horizontal={true}
                    keyExtractor={item => item.id}
                  />
                  <Button onPress={handleSubmit} title="Submit" />
                </View>
              )}
            </Formik>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
