import { Alert, Linking, Pressable, Text, TouchableHighlight, View } from 'react-native';
import { cellStyles } from './styles';
import { Game, StatefulActivity } from './gameContext';
import { addSelectedId } from './gameData';

export type CellProps = {
  contents: StatefulActivity,
  gamePlay: boolean
  winningIds: Set<string>
  realm: Realm,
  game: Game
};

export default function Cell ({contents, gamePlay, winningIds, realm, game}: CellProps) {

  function getHighlightStyle() {
    var returnStyle = cellStyles.availableTouchable;
    if (!gamePlay && winningIds.has(contents.position)) {
      returnStyle = cellStyles.winningTouchable;
    } else if (game.selectedIds.has(contents.position)) {
      returnStyle = cellStyles.selectedTouchable;
    }
    return returnStyle;
  }

  function getPressableStyle() {
    return game.selectedIds.has(contents.position) ? cellStyles.selectedCell : cellStyles.availableCell;
  }

  function handlePress() {
    if (!gamePlay) {
      return;
    }
    addSelectedId(realm, game, contents.position);
  }

  function handleMoreInfo() {
    const info = contents.activity;
    if (info.url !== undefined) {
      const url = info.url
      Alert.alert(
        info.name,
        info.notes,
        [{text: "Go to " + info.url, onPress: () => Linking.openURL(url)}]
        );
    } else if (info.notes !== undefined) {
    Alert.alert(
      info.name,
      info.notes
      );
    } else {
      Alert.alert(
        info.name,
        "No additional information (yet)"
        );
    }
  }

  function handleLongPress() {
    Alert.alert(
      contents.activity.name + "!",
      "Did you go?",
      [
        {text: 'Yes!', onPress: () => handlePress()},
        {text: 'No', onPress: () => {}, style: 'cancel'},
        {text: "Tell me more", onPress: () => handleMoreInfo()}
      ]
      );
  }

  return (
    <TouchableHighlight style={getHighlightStyle()} onPress={handlePress} onLongPress={handleLongPress}>
    <View style={getPressableStyle()}>
      <Pressable onPress={handlePress} onLongPress={handleLongPress}>
        <Text style={cellStyles.text}>{contents.activity.displayName}</Text>
      </Pressable>
    </View>
    </TouchableHighlight>
  );
};
