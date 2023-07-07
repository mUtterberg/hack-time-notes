import { Button, Text, TextInput, View } from 'react-native'
import { Game, GameContext } from './gameContext';
import { BSON } from 'realm';


function readGame(itemId: string) {
  console.log("Converting "+itemId+" to ObjectId")
  console.log("length: "+itemId.length)
  const uuid = BSON.ObjectId.createFromHexString(itemId);
  const item = GameContext.useObject(Game, uuid);
  console.log("Found game: "+item._id.toHexString());
  return item;
}

export default function UpdateGame(params: {itemId: string}) {
  console.log(params)
  const itemId = params.route.params.itemId;
  console.log("itemId: "+itemId)
  return (
    <>
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
      {
        itemId ? (
          <Text>Updating Game {readGame(itemId)._id?.toHexString()}</Text>
        ) : <Text>Failed to load game</Text>
      }
      <Button title="Save changes" onPress={() => {}} />
    </View>
    </>
  )
}