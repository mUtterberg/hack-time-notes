import { Alert, FlatList, Pressable, Text, TouchableHighlight, View } from "react-native";
import { ClevelandActivity, GameContext } from "./gameContext";
import ImageButton from "./imageButton";
import { navigatorStyles } from "./styles";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
// import UpdateGame from "./updateGame";


const ActivityStack = createNativeStackNavigator();

function TableRow({ item, realm }: { item: ClevelandActivity, realm: Realm }) {
  const navigation = useNavigation();


  function handlePress() {
    Alert.alert(
      "Activity: " + item._id.toHexString(),
      "Update activity?",
      [
        {
          text: 'Update',
          onPress: () => {
            navigation.navigate('Update Activity', {itemId: item._id.toHexString()})
          }
        },
        // { text: 'Delete', onPress: () => {deleteArchivedGame(realm, item)} },
        { text: 'Cancel', onPress: () => {}, style: 'cancel' }
      ]
    )
  }

  return (
    <TouchableHighlight onPress={ () => console.log("Selected activity from archive: "+item._id.toHexString())}>
    <View style={navigatorStyles.tableRow}>
      <Pressable onPress={handlePress}>
      <View style={navigatorStyles.tableCell}>
        <Text style={navigatorStyles.tableText}>{item._id.toHexString()}</Text>
      </View>
      <View style={navigatorStyles.tableCell}>
        <Text style={navigatorStyles.tableText}>{item.displayName}</Text>
      </View>
      <View style={navigatorStyles.tableCell}>
        <Text style={navigatorStyles.tableText}>{item.name}</Text>
      </View>
      <View style={navigatorStyles.tableCell}>
        <Text style={navigatorStyles.tableText}>{item.category}</Text>
      </View>
      </Pressable>
    </View>
    </TouchableHighlight>
  )
}

function ActivityList() {
  const realm = GameContext.useRealm();
  const activities = GameContext.useQuery(ClevelandActivity);
  console.log("Found "+activities.length+" activity(activities) in navigator")
  return (
    <>
    <View style={{ flex: 1 }}>
      <ImageButton />
      <Text>Data Navigator: All activities ({activities.length})</Text>
      <FlatList
        data={activities}
        keyExtractor={item => item._id.toHexString()}
        renderItem={({ item }) => (
          <TableRow item={item} realm={realm} />
        )}
      />
    </View>
    </>
  )
}


export default function ActivityNavigator() {
  return (
    <ActivityStack.Navigator>
      <ActivityStack.Screen name="All Activities" component={ActivityList} />
      {/* <ActivityStack.Screen name="Update Game" component={UpdateGame} /> */}
    </ActivityStack.Navigator>
  )
};