/**
 *
 * @format
 */

import React from 'react';
import { SafeAreaView, StatusBar, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getBackgroundColor } from './styles';

import { GameContext } from './gameContext';
import Bingo from './bingo';
import GameNavigator from './gameNavigator';

const Tab = createBottomTabNavigator();

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: getBackgroundColor(isDarkMode)
      }}>
      <GameContext.RealmProvider>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={getBackgroundColor(isDarkMode)}
        />
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Bingo"
          screenOptions={{
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
            headerStyle: {
              backgroundColor: 'papayawhip',
              height: 30,
            }
          }}
        >
          <Tab.Screen name="Bingo" component={Bingo} />
          <Tab.Screen name="Games" component={GameNavigator} />
        </Tab.Navigator>
      </NavigationContainer>
      </GameContext.RealmProvider>
    </SafeAreaView>
  );
}

export default App;
