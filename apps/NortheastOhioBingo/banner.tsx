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
      <Text style={styles.title}>Northeast Ohio Bingo</Text>
      <View style={styles.buttonRow}>
        <Pressable style={styles.button} onPress={handleNewGame} onLongPress={handleLongPress}>
          <Text style={styles.buttonText}>New Game?</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={handleLongPress} onLongPress={handleLongPress}>
          <Text style={styles.buttonText}>Change mode?</Text>
          <Text style={styles.buttonText}>(Mode: {gameMode})</Text>
        </Pressable>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  banner: {
    flex: 1,
    backgroundColor: '#7E252D',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    margin: 10,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  buttonRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
  },
  button: {
    color: "black",
    boxShadow: "4px 8px ",
    shadowOffset: {
      width: 4,
      height: 8,
    },
    shadowColor: "#5F1C48",
    shadowOpacity: 0.5,
    elevation: 20,
    shadowRadius: 4,
    borderWidth: 1,
    height: 60,
    padding: 10,
    margin: 10,
    backgroundColor: 'burntsienna',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    flex: 1,
    borderColor: 'black',
  },
  buttonText: {
    alignItems: 'center',
    color: 'black',
  }
});
