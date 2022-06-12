import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import 'react-native-gesture-handler';

import { Tabs } from './src/navigation';

LogBox.ignoreLogs( [
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
] );

const App = () => {
  return (
    <NavigationContainer>
      <Tabs />
    </NavigationContainer>
  );
};

export default App;