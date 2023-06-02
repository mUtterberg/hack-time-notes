/**
 *
 * @format
 */

import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { getBackgroundColor } from './styles';

import { GameContext } from './gameContext';
import Bingo from './bingo';
import GameNavigator from './gameNavigator';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function StackScreen() {
  return (
    <Stack.Navigator
      initialRouteName='Bingo'
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Bingo" component={Bingo} />
      <Stack.Screen name="Settings" component={GameNavigator} />
    </Stack.Navigator>
  )
}

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <GameContext.RealmProvider>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={getBackgroundColor(isDarkMode)}
        />
      <NavigationContainer>
        <StackScreen />
      </NavigationContainer>
    </GameContext.RealmProvider>
    </SafeAreaProvider>
  );
}

export default App;
