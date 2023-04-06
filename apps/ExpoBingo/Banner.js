import { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function Banner({ newGame, handleNewGame }) {

  return (
    <View style={styles.banner}>
      <Text>Expo Bingo</Text>
      <Button title="New Game" onPress={handleNewGame}/>
    </View>
  )
};

const styles = StyleSheet.create({
  banner: {
    flex: 1,
    backgroundColor: 'lightpink',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    margin: 10,
  }
});
