import { Alert, Linking, Pressable, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { ClevelandData } from './contentTypes';

type TrackingFunction = (id: string) => void;

export type CellProps = {
  contents: ClevelandData,
  id: string,
  selectedIds: Set<string>,
  addSelectedId: TrackingFunction,
  gamePlay: boolean
};

export default function Cell ({contents, id, selectedIds, addSelectedId, gamePlay}: CellProps) {

  function getHighlightStyle() {
    return selectedIds.has(id) ? styles.selectedTouchable : styles.availableTouchable;
  }

  function getPressableStyle() {
    return selectedIds.has(id) ? styles.selectedCell : styles.availableCell;
  }

  function handlePress() {
    if (!gamePlay) {
      return;
    }
    addSelectedId(id);
  }

  function handleMoreInfo() {
    if (contents.url !== undefined) {
      Alert.alert(
        contents.name,
        contents.notes,
        [{text: "Go to " + contents.url, onPress: () => Linking.openURL(contents.url)}]
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
        <Text>{contents.displayName}</Text>
      </Pressable>
    </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  availableCell: {
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth: 1,
    flex: 1,
    height: 40,
    backgroundColor: 'yellow'
  },
  selectedCell: {
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth: 1,
    flex: 1,
    height: 40,
    backgroundColor: 'green'
  },
  availableTouchable: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    flex: 1,
    height: 40,
    backgroundColor: 'yellow'
  },
  selectedTouchable: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    flex: 1,
    height: 40,
    backgroundColor: 'green'
  },
});
