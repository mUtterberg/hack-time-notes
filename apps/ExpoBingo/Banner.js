import { Component, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function Banner() {
  const [newGame, setNewGame] = useState(false);

  function handleNewGame() {
    setNewGame(true);
    alert("You tapped New Game!");
  }

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
