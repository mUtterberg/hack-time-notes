/**
 *
 * @format
 */

import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { getBackgroundColor } from './styles';

import { GameContext } from './gameContext';
import Bingo from './bingo';
import GameNavigator from './gameNavigator';

const Tab = createBottomTabNavigator();

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
        <Tab.Navigator>
          <Tab.Screen name="Bingo" component={Bingo} />
          <Tab.Screen name="Games" component={GameNavigator} />
        </Tab.Navigator>
      </NavigationContainer>
    </GameContext.RealmProvider>
    </SafeAreaProvider>
  );
}

export default App;
