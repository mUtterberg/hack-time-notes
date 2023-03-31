import { Component } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

class Banner extends Component {
  render () {
    return (
      <View style={styles.banner}>
        <Text>Expo Bingo</Text>
        <Button title="New Game" onPress={() => alert("You tapped New Game!")}/>
      </View>
    )
  }
};

export default Banner;

const styles = StyleSheet.create({
  banner: {
    flex: 1,
    backgroundColor: 'lightpink',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  }
});
