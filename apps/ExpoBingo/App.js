import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Banner from './Banner';
import Board from './Board';
import Game from './Game';

export default function App() {
  return (
    <View style={styles.container}>
      <Banner />
      <Board />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    backgroundColor: 'lightcyan',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  }
});
