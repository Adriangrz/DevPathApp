import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import {AuthContextProvider} from './src/contexts/AuthContext';
import {MainStack} from './src/navigation/MainStack';
import {ThemeProvider} from './src/providers/ThemeProvider';
import {store, persistor} from './src/app/configureStore';

function App(): JSX.Element {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AuthContextProvider>
          <Provider store={store}>
            <PersistGate persistor={persistor}>
              <NavigationContainer>
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
