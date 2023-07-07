import { useState } from 'react';
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
  const [name, setName] = useState('');
  const [mode, setMode] = useState('');
  const itemId = params.route.params.itemId;
  const game = readGame(itemId);
  return (
    <>
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
      {
        game ? (
          <>
          <Text>Updating Game {game._id?.toHexString()}</Text>
          <Text>Name:</Text>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            placeholder={"Name: "+game.name}
            defaultValue={game.name}
            onChangeText={text => setName(text)}
          />
          <Text>Mode:</Text>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            placeholder={"Mode: "+game.mode}
            defaultValue={game.mode}
            onChangeText={text => setMode(text)}
          />
          </>
        ) : <Text>Failed to load game</Text>
      }
      <Button title="Save changes" onPress={() => {}} />
    </View>
    </>
  )
}