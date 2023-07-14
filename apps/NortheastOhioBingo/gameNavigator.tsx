import { MutableRefObject, createRef, useRef, useState } from "react";
import { Alert, FlatList, Pressable, Text, TouchableHighlight, View } from "react-native";
import { Game, GameContext } from "./gameContext";
import ImageButton from "./imageButton";
import { navigatorStyles } from "./styles";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import UpdateGame from "./updateGame";

const GameStack = createNativeStackNavigator();


function deleteArchivedGame(realm: Realm, item: Game) {
  realm.write(() => {
    realm.delete(item);
  });
}

function TableRow({ item, realm }: { item: Game, realm: Realm }) {
  const navigation = useNavigation();
  const rowStyle = item.resolution ? navigatorStyles.winningRow : navigatorStyles.activeRow;


  function handlePress() {
    var message: string;
    var options: {text: string, onPress: () => void, style?: "cancel" | "default" | "destructive"}[];
    if (item.active?.valueOf() === true) {
      message = "Update game?"
      options = [
        {
          text: 'Update',
          onPress: () => {
            navigation.navigate('Update Game', {itemId: item._id.toHexString()})
          }
        },
        { text: 'Delete', onPress: () => {deleteArchivedGame(realm, item)} },
        { text: 'Cancel', onPress: () => {}, style: 'cancel' }
      ]
    } else {
      message = "Delete game?"
      options = [
        { text: 'Delete', onPress: () => {deleteArchivedGame(realm, item)} },
        { text: 'Cancel', onPress: () => {}, style: 'cancel' }
      ]
    }
    Alert.alert(
      "Game: " + item._id.toHexString(),
      message,
      options
    )
  }

  return (
    <TouchableHighlight onPress={ () => console.log("Selected game from archive: "+item._id.toHexString())}>
    <View style={rowStyle}>
      <Pressable onPress={handlePress}>
      <View style={navigatorStyles.tableCell}>
        <Text style={navigatorStyles.tableText}>ID: {item._id.toHexString()}</Text>
      </View>
      <View style={navigatorStyles.tableCell}>
        <Text style={navigatorStyles.tableText}>Mode: {item.mode}</Text>
      </View>
      <View style={navigatorStyles.tableCell}>
        <Text style={navigatorStyles.tableText}>{item.active ? "Active" : "Inactive"}</Text>
      </View>
      {item.resolution ? (
        <>
        <View style={navigatorStyles.tableCell}>
          <Text style={navigatorStyles.tableText}>Resolution: {item.resolution} win</Text>
        </View>
        </>
      ) : null}
      {item.winningIds ? (
        <>
        <View style={navigatorStyles.tableCell}>
          <Text style={navigatorStyles.tableText}>Winning IDs: {item.winningIds.join(", ")}</Text>
        </View>
        </>
      ) : null}
      <View style={navigatorStyles.tableCell}>
        <Text style={navigatorStyles.tableText}>Selected: {item.selectedIds.join(", ")}</Text>
      </View>
      </Pressable>
    </View>
    </TouchableHighlight>
  )
}


function GameList() {
  const realm = GameContext.useRealm();
  const games = GameContext.useQuery(Game);
  console.log("Found "+games.length+" game(s) in navigator")

  const [filterFieldDisplay, setFilterFieldDisplay] = useState("All");

  return (
    <>
    <View style={{ flex: 1 }}>
      <ImageButton />
        <Text style={{width: "50%"}}>
          Data Navigator: {filterFieldDisplay} games ({games.length})
        </Text>
      <FlatList
        data={games}
        keyExtractor={item => item._id.toHexString()}
        renderItem={({ item }) => (
          <TableRow item={item} realm={realm} />
        )}
      />
    </View>
    </>
  )
}


export default function GameNavigator() {
  return (
    <GameStack.Navigator>
      <GameStack.Screen name="Game Navigator" component={GameList} />
      <GameStack.Screen name="Update Game" component={UpdateGame} />
    </GameStack.Navigator>
  )
};
