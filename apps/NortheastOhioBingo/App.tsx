/**
 *
 * @format
 */

import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';

import Board from './bingo';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? "#7E252D" : "#FBF4F4",
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View style={styles.sectionContainer}>
        <Image
          style={styles.banner}
          source={{
            uri: 'https://www.onlyinyourstate.com/wp-content/uploads/2019/10/29015623688_1fc59b7c8b_k.jpg',
          }}
        />
        </View>
        <View
          style={{
            backgroundColor: isDarkMode ? "#7E252D" : Colors.white,
          }}>
          <Board />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  highlight: {
    fontWeight: '700',
  },
  banner: {
    height: 200,
    resizeMode: 'cover',
    justifyContent: 'center',
    flex: 1,
  }
});

export default App;
