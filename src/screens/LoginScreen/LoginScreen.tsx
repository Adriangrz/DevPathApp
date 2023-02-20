import React, {useCallback, useEffect, useRef} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  Button,
} from 'react-native';
import {Formik} from 'formik';
import {SafeAreaView} from 'react-native-safe-area-context';
import * as Yup from 'yup';
import {useHeaderHeight} from '@react-navigation/elements';

import {styles} from './styles';
import {useAuth} from '../../contexts';
import {AuthFormType} from '../../types/authFormType';
import {PublicStackScreenProps} from '../../navigation/types';

import {Input} from '../../components/Input';
import {Button as CustomButton} from '../../components/Button';

type Login = {
  SubmitValues: AuthFormType;
  setSubmitting: (isSubmitting: boolean) => void;
};

type Props = PublicStackScreenProps<'Login'>;

const LoginSchema = Yup.object().shape({
  email: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
});

export const LoginScreen = ({navigation}: Props): JSX.Element => {
  const headerHeight = useHeaderHeight();
  const {setCredentials} = useAuth();

  const ref_emailInput = useRef<TextInput>(null);
  const ref_passwordInput = useRef<TextInput>(null);

  const login = useCallback(
    ({SubmitValues, setSubmitting}: Login) => {
      setCredentials(SubmitValues.email);
      setSubmitting(false);
    },
    [setCredentials],
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
              validationSchema={LoginSchema}
              onSubmit={(values, {setSubmitting}) => {
                login({SubmitValues: values, setSubmitting});
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
                  <CustomButton onPress={handleSubmit} title="Log in" />

                  <Button
                    onPress={() => navigation.navigate('Register')}
                    title="Register"
                  />
                </View>
              )}
            </Formik>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
