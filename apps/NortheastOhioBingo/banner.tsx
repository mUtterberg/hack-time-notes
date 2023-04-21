import { Button, StyleSheet, Text, View } from 'react-native';

export default function Banner({ handleNewGame }: { handleNewGame: () => void }) {

  return (
    <View style={styles.banner}>
      <Text>Northeast Ohio Bingo</Text>
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
