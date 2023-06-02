import { Alert, Pressable, Text, View } from 'react-native';
import { bannerStyles } from './styles';
import { loadAllGames, setGameMode } from './gameData';
import { Game } from './gameContext';

export default function Banner({ handleNewGame, handleClearGames, game, realm }: { handleNewGame: () => void, handleClearGames: () => void, game: Game, realm: Realm }) {
  function handleLongPress() {
    Alert.alert(
      "Game Mode: " + game?.mode,
      "Change game mode?",
      [
        { text: 'Standard', onPress: () => setGameMode(realm, game, "simple") },
        { text: 'Blackout', onPress: () => setGameMode(realm, game, "blackout") },
        { text: 'Cancel', onPress: () => {}, style: 'cancel' }
      ]
    )
  }
  const buttons = (
    <>
    <Pressable style={bannerStyles.button} onPress={handleNewGame} onLongPress={handleLongPress}>
      <Text style={bannerStyles.buttonText}>New Game?</Text>
    </Pressable>
    {/* <Pressable style={bannerStyles.button} onPress={handleClearGames} onLongPress={handleLongPress}>
      <Text style={bannerStyles.buttonText}>Delete {loadAllGames(realm).filtered('active = $0', true).length - 1} active games?</Text>
    </Pressable> */}
    <Pressable style={bannerStyles.button} onPress={handleLongPress} onLongPress={handleLongPress}>
      <Text style={bannerStyles.buttonText}>Change mode?</Text>
      <Text style={bannerStyles.buttonText}>(Mode: {game?.mode})</Text>
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


