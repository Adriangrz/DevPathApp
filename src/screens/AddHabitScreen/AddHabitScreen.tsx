import {Formik} from 'formik';
import React, {useCallback, useState} from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import * as Yup from 'yup';
import uuid from 'react-native-uuid';

import {HabitsStackScreenProps} from '../../navigation/types';
import {styles} from './styles';
import {Input} from '../../components/Input';
import {Button} from '../../components/Button';
import {Tag} from '../../types/tag';
import {useDispatch} from 'react-redux';
import {addHabit} from '../../features/habits/habitsSlice';

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
  const [tagName, setTagName] = useState<string>('');
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
      style={styles.container}>
      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.container}>
          <Formik
            initialValues={habitFormInitialValues}
            validationSchema={HabitSchema}
            onSubmit={(values, {setSubmitting}) => {
              addHabitOnSubmit({submitValues: values, setSubmitting});
            }}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
              values,
              errors,
              touched,
            }) => (
              <View style={styles.addHabitForm}>
                <View>
                  <Input
                    onChangeText={handleChange('name')}
                    onBlur={handleBlur('name')}
                    value={values.name}
                    placeholder="name"
                    autoCapitalize="none"
                    returnKeyType="next"
                  />
                  {errors.name && touched.name ? (
                    <Text style={styles.error}>{errors.name}</Text>
                  ) : null}

                  <View style={styles.tagsList}>
                    <FlatList
                      data={values.tags}
                      renderItem={({item}) => (
                        <View style={styles.tag}>
                          <Text style={styles.tagText}>{item.name}</Text>
                          <Pressable
                            style={styles.deleteTagContainer}
                            onPress={() =>
                              setFieldValue(
                                'tags',
                                values.tags.filter(
                                  element => element.id !== item.id,
                                ),
                              )
                            }>
                            <Text style={styles.deleteTagText}>x</Text>
                          </Pressable>
                        </View>
                      )}
                      showsHorizontalScrollIndicator={false}
                      horizontal={true}
                      keyExtractor={item => item.id}
                    />
                  </View>
                  <View style={styles.addTagContainer}>
                    <Input
                      style={styles.addTag}
                      onChangeText={setTagName}
                      value={tagName}
                      placeholder="tag name"
                      autoCapitalize="none"
                      returnKeyType="done"
                    />
                    <Button
                      title="+"
                      onPress={() => {
                        setFieldValue('tags', [
                          ...values.tags,
                          {id: uuid.v4().toString(), name: tagName},
                        ]);
                        setTagName('');
                      }}
                    />
                  </View>
                </View>
                <Button onPress={handleSubmit} title="Submit" />
              </View>
            )}
          </Formik>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};
