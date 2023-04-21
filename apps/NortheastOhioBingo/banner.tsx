import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';

export default function Banner({ handleNewGame, gameMode, setGameMode }: { handleNewGame: () => void, gameMode: string, setGameMode: () => void }) {
  function handleLongPress() {
    console.log("Current mode: " + gameMode);
    Alert.alert(
      "Game Mode: " + gameMode,
      "Change game mode?",
      [
        { text: 'Standard', onPress: () => setGameMode("simple") },
        { text: 'Blackout', onPress: () => setGameMode("blackout") },
        { text: 'Cancel', onPress: () => {}, style: 'cancel' }
      ]
    )
    console.log("New mode: " + gameMode);
  }

  return (
    <View style={styles.banner}>
      <Text>Northeast Ohio Bingo</Text>
      <View style={styles.newGame}>
        <Pressable onPress={handleNewGame} onLongPress={handleLongPress}>
          <Text>New Game</Text>
        </Pressable>
      </View>
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
  },
  newGame: {
    flex: 1,
    borderWidth: 1,
    backgroundColor: 'lightpink',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    height: 60,
    padding: 10,
    margin: 10,
  }
});
