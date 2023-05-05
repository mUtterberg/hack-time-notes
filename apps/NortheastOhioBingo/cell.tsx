import { Alert, Linking, Pressable, Text, TouchableHighlight, View } from 'react-native';
import { cellStyles } from './styles';
import { ClevelandData } from './contentTypes';

type TrackingFunction = (id: string) => void;

export type CellProps = {
  contents: ClevelandData,
  id: string,
  selectedIds: Set<string>,
  addSelectedId: TrackingFunction,
  gamePlay: boolean
  winningIds: Set<string>
};

export default function Cell ({contents, id, selectedIds, addSelectedId, gamePlay, winningIds}: CellProps) {

  function getHighlightStyle() {
    // var returnStyle = cellStyles.availableTouchable;
    // if (!gamePlay && winningIds.has(id)) {
    //   returnStyle = cellStyles.winningTouchable;
    // } else if (selectedIds.has(id)) {
    //   returnStyle = cellStyles.selectedTouchable;
    // }
    // return returnStyle;
    return selectedIds.has(id) ? cellStyles.selectedTouchable : cellStyles.availableTouchable;
  }

  function getPressableStyle() {
    return selectedIds.has(id) ? cellStyles.selectedCell : cellStyles.availableCell;
  }

  function handlePress() {
    if (!gamePlay) {
      return;
    }
    addSelectedId(id);
  }

  function handleMoreInfo() {
    if (contents.url !== undefined) {
      const url = contents.url
      Alert.alert(
        contents.name,
        contents.notes,
        [{text: "Go to " + contents.url, onPress: () => Linking.openURL(url)}]
        );
    } else if (contents.notes !== undefined) {
    Alert.alert(
      contents.name,
      contents.notes
      );
    } else {
      Alert.alert(
        contents.name,
        "No additional information (yet)"
        );
    }
  }

  function handleLongPress() {
    Alert.alert(
      contents.name + "!",
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
        <Text style={cellStyles.text}>{contents.displayName}</Text>
      </Pressable>
    </View>
    </TouchableHighlight>
  );
};
