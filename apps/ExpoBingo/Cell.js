import { useState } from 'react';
import { Pressable, StyleSheet, Text, TouchableHighlight, View } from 'react-native';

  
export default function Cell({ contents }) {
  
  const [isSelected, setSelected] = useState(false);

  function getStyle() {
    return isSelected ? styles.cell.selected : styles.cell.available;
  }

  function handlePress() {
    setSelected(!isSelected);
    alert("You selected " + contents + "!");
  }

  function handleLongPress() {
    alert("You long-pressed " + contents + "!");
  }

  return (
    <TouchableHighlight style={getStyle()} onPress={handlePress} onLongPress={handleLongPress}>
    <View style={getStyle()}>
      <Pressable title={contents} onPress={handlePress} onLongPress={handleLongPress}>
        <Text>{contents}</Text>
      </Pressable>
    </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  cell: {
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
  }

});
