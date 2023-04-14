import { Alert, Pressable, StyleSheet, Text, TouchableHighlight, View } from 'react-native';

type TrackingFunction = (id: string) => void;

export type CellProps = {
  contents: string,
  selectedIds: Set<string>,
  addSelectedId: TrackingFunction,
  gamePlay: boolean
};

export default function Cell ({contents, selectedIds, addSelectedId, gamePlay}: CellProps) {

  function getStyle() {
    return selectedIds.has(contents) ? styles.selected : styles.available;
  }

  function handlePress() {
    if (!gamePlay) {
      return;
    }
    addSelectedId(contents);
  }

  function handleLongPress() {
    Alert.alert("You long-pressed " + contents + "!");
  }

  return (
    <TouchableHighlight style={getStyle()} onPress={handlePress} onLongPress={handleLongPress}>
    <View style={getStyle()}>
      <Pressable onPress={handlePress} onLongPress={handleLongPress}>
        <Text>{contents}</Text>
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
