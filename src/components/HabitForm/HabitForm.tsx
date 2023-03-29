import {useFormikContext} from 'formik';
import React, {useState} from 'react';
import {FlatList, Pressable, Text, View} from 'react-native';
import uuid from 'react-native-uuid';

import {Tag} from '../../types/tag';
import {Button} from '../Button';
import {Input} from '../Input';
import {styles} from './styles';

export const HabitForm = (): JSX.Element => {
  const [tagName, setTagName] = useState<string>('');
  const {
    values,
    errors,
    touched,
    setFieldValue,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormikContext<{
    name: string;
    tags: Tag[];
  }>();

  return (
    <View style={styles.form}>
      <View>
        <Input
          testID="name-input"
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
                      values.tags.filter(element => element.id !== item.id),
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
            testID="tag-input"
            style={styles.addTag}
            onChangeText={setTagName}
            value={tagName}
            placeholder="tag name"
            autoCapitalize="none"
            returnKeyType="done"
          />
          <Button
            testID="add-tag-btn"
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
      <Button testID="add-todo-btn" onPress={handleSubmit} title="Submit" />
    </View>
  );
};
