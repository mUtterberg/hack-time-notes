import { Alert, Pressable, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
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

  function getStyle() {
    return selectedIds.has(id) ? styles.selected : styles.available;
  }

  function handlePress() {
    if (!gamePlay) {
      return;
    }
    addSelectedId(id);
  }

  function handleLongPress() {
    Alert.alert("You long-pressed " + contents.name + "!");
  }

  return (
    <TouchableHighlight style={getStyle()} onPress={handlePress} onLongPress={handleLongPress}>
    <View style={getStyle()}>
      <Pressable onPress={handlePress} onLongPress={handleLongPress}>
        <Text>{contents.name}</Text>
      </Pressable>
    </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  available: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    flex: 1,
    height: 40,
    backgroundColor: 'yellow'
  },
  selected: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    flex: 1,
    height: 40,
    backgroundColor: 'green'
  }
});
