import { Alert, Pressable, Text, View } from 'react-native';
import { bannerStyles } from './styles';

export default function Banner({ handleNewGame, gameMode, setGameMode, loadSavedGame }: { handleNewGame: () => void, gameMode: string, setGameMode: (mode: string) => void , loadSavedGame: boolean}) {
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
  const buttons = loadSavedGame ? (
    <>
    <Pressable style={bannerStyles.button} onPress={handleNewGame} onLongPress={handleLongPress}>
      <Text style={bannerStyles.buttonText}>Load Saved Game?</Text>
    </Pressable>
    <Pressable style={bannerStyles.button} onPress={handleNewGame} onLongPress={handleLongPress}>
      <Text style={bannerStyles.buttonText}>New Game?</Text>
    </Pressable>
    <Pressable style={bannerStyles.button} onPress={handleLongPress} onLongPress={handleLongPress}>
      <Text style={bannerStyles.buttonText}>Change mode?</Text>
      <Text style={bannerStyles.buttonText}>(Mode: {gameMode})</Text>
    </Pressable>
    </>

    ) : (
    <>
    <Pressable style={bannerStyles.button} onPress={handleNewGame} onLongPress={handleLongPress}>
      <Text style={bannerStyles.buttonText}>New Game?</Text>
    </Pressable>
    <Pressable style={bannerStyles.button} onPress={handleLongPress} onLongPress={handleLongPress}>
      <Text style={bannerStyles.buttonText}>Change mode?</Text>
      <Text style={bannerStyles.buttonText}>(Mode: {gameMode})</Text>
    </Pressable>
    </>
  )

  return (
    <View style={bannerStyles.banner}>
      <Text style={bannerStyles.title}>Northeast Ohio Bingo</Text>
      <View style={bannerStyles.buttonRow}>
        {buttons}
      </View>
    </View>
  )
};


