import React, {useCallback, useEffect, useRef} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Formik} from 'formik';
import {SafeAreaView} from 'react-native-safe-area-context';
import * as Yup from 'yup';
import {useHeaderHeight} from '@react-navigation/elements';

import {styles} from './styles';
import {AuthFormType} from '../../types/authFormType';
import {PublicStackScreenProps} from '../../navigation/types';

import {Input} from '../../components/Input';
import {Button} from '../../components/Button';

type Register = {
  SubmitValues: AuthFormType;
  setSubmitting: (isSubmitting: boolean) => void;
};

type Props = PublicStackScreenProps<'Register'>;

const RegisterSchema = Yup.object().shape({
  email: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
});

export const RegisterScreen = ({navigation}: Props): JSX.Element => {
  const headerHeight = useHeaderHeight();

  const ref_emailInput = useRef<TextInput>(null);
  const ref_passwordInput = useRef<TextInput>(null);

  const register = useCallback(
    ({setSubmitting}: Register) => {
      navigation.navigate('Login');
      setSubmitting(false);
    },
    [navigation],
  );

  useEffect(() => {
    ref_emailInput.current?.focus();
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={headerHeight}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.mainContainer}>
          <View style={styles.container}>
            <Formik
              initialValues={{email: '', password: ''}}
              validationSchema={RegisterSchema}
              onSubmit={(values, {setSubmitting}) => {
                register({SubmitValues: values, setSubmitting});
              }}>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
              }) => (
                <View style={styles.loginForm}>
                  <Input
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    placeholder="email"
                    autoCapitalize="none"
                    returnKeyType="next"
                    innerRef={ref_emailInput}
                    onSubmitEditing={() => {
                      setTimeout(() => {
                        if (ref_passwordInput.current) {
                          ref_passwordInput.current.focus();
                        }
                      }, 1000);
                    }}
                  />
                  {errors.email && touched.email ? (
                    <Text style={styles.error}>{errors.email}</Text>
                  ) : null}
                  <Input
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    placeholder="password"
                    autoCapitalize="none"
                    returnKeyType="done"
                    innerRef={ref_passwordInput}
                    secureTextEntry={true}
                    onSubmitEditing={handleSubmit}
                  />
                  {errors.password && touched.password ? (
                    <Text style={styles.error}>{errors.password}</Text>
                  ) : null}
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
