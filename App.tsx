import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import SplashScreen from 'react-native-splash-screen';

import {AuthContextProvider} from './src/contexts/AuthContext';
import {MainStack} from './src/navigation/MainStack';
import {NavigationTheme, ThemeProvider} from './src/providers/ThemeProvider';
import {store, persistor} from './src/app/configureStore';

function App(): JSX.Element {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AuthContextProvider>
          <Provider store={store}>
            <PersistGate persistor={persistor}>
              <NavigationContainer theme={NavigationTheme}>
                <MainStack />
              </NavigationContainer>
            </PersistGate>
          </Provider>
        </AuthContextProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

export default App;
