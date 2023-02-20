import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {AuthContextProvider} from './src/contexts/AuthContext';
import {MainStack} from './src/navigation/MainStack';
import {ThemeProvider} from './src/providers/ThemeProvider';

function App(): JSX.Element {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AuthContextProvider>
          <NavigationContainer>
            <MainStack />
          </NavigationContainer>
        </AuthContextProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

export default App;
