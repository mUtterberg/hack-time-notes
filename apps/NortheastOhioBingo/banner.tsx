import { Alert, Pressable, Text, View } from 'react-native';
import { bannerStyles } from './styles';

export default function Banner({ handleNewGame, gameMode, setGameMode }: { handleNewGame: () => void, gameMode: string, setGameMode: (mode: string) => void }) {
  function handleLongPress() {
    Alert.alert(
      "Game Mode: " + gameMode,
      "Change game mode?",
      [
        { text: 'Standard', onPress: () => setGameMode("simple") },
        { text: 'Blackout', onPress: () => setGameMode("blackout") },
        { text: 'Cancel', onPress: () => {}, style: 'cancel' }
      ]
    )
  }
  const buttons = (
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


