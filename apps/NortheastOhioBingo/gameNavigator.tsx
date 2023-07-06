import { FlatList, Pressable, Text, TouchableHighlight, View } from "react-native";
import { Game, GameContext } from "./gameContext";
import ImageButton from "./imageButton";
import { navigatorStyles } from "./styles";


function TableRow({ item }: { item: Game }) {

  function handlePress() {
    console.log("Selected game from archive: "+item._id.toHexString())
  }

  return (
    <TouchableHighlight onPress={ () => console.log("Selected game from archive: "+item._id.toHexString())}>
    <View style={navigatorStyles.tableRow}>
      <Pressable onPress={handlePress}>
      <View style={navigatorStyles.tableCell}>
        <Text style={navigatorStyles.tableText}>{item._id.toHexString()}</Text>
      </View>
      <View style={navigatorStyles.tableCell}>
        <Text style={navigatorStyles.tableText}>{item.mode}</Text>
      </View>
      <View style={navigatorStyles.tableCell}>
        <Text style={navigatorStyles.tableText}>{item.active ? "Active" : "Inactive"}</Text>
      </View>
      <View style={navigatorStyles.tableCell}>
        <Text style={navigatorStyles.tableText}>Selected: {item.selectedIds.join(",")}</Text>
      </View>
      </Pressable>
    </View>
    </TouchableHighlight>
  )
}

export default function GameNavigator() {
  const games = GameContext.useQuery(Game);
  console.log("Found "+games.length+" game(s) in navigator")
  return (
    <>
    <View style={{ flex: 1 }}>
      <ImageButton />
      <Text>Data Navigator: All games ({games.length})</Text>
      <FlatList
        data={games}
        keyExtractor={item => item._id.toHexString()}
        renderItem={({ item }) => (
          <TableRow item={item} />
        )}
      />
    </View>
    </>
  )
};
