import { FlatList, StyleSheet, Text, View } from "react-native";
import { Game, GameContext } from "./gameContext";
import ImageButton from "./imageButton";
import { navigatorStyles } from "./styles";

function TableRow({ item }: { item: Game }) {
  return (
    <View style={navigatorStyles.tableRow}>
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
    </View>
  )
}

export default function GameNavigator() {
  const games = GameContext.useQuery(Game);
  console.log("Found "+games.length+" game(s) in navigator")
  return (
    <>
    <View style={{ flex: 1 }}>
      <ImageButton />
      <Text>Data Navigator: All games</Text>
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
