import { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native'
import { ClevelandActivity, GameContext } from './gameContext';
import { BSON } from 'realm';


function readActivity(itemId: string) {
  console.log("Converting "+itemId+" to ObjectId")
  console.log("length: "+itemId.length)
  const uuid = BSON.ObjectId.createFromHexString(itemId);
  const item = GameContext.useObject(ClevelandActivity, uuid);
  console.log("Found activity: "+item._id.toHexString());
  console.log("Activity properties: "+JSON.stringify(item))
  return item;
}

function saveUpdates(realm: Realm, activity: ClevelandActivity, name: string, displayName: string, category: string, notes: string, url: string) {
    console.log("Saving updates to activity")
    if (name != "") {
      console.log("Updating name to "+name)
      realm.write(() => {
        activity.name = name
      })
    }
    if (displayName != "") {
      console.log("Updating displayName to "+displayName)
      realm.write(() => {
        activity.displayName = displayName
      })
    }
    if (category != "") {
      console.log("Updating category to "+category)
      realm.write(() => {
        activity.category = category
      })
    }
    if (notes != "") {
      console.log("Updating notes to "+notes)
      realm.write(() => {
        activity.notes = notes
      })
    }
    if (url != "") {
      console.log("Updating url to "+url)
      realm.write(() => {
        activity.url = url
      })
    }
};

export default function UpdateActivity(params: {itemId: string}) {
  console.log(params)
  const realm = GameContext.useRealm();
  const [name, setName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [category, setCategory] = useState('');
  const [notes, setNotes] = useState('');
  const [url, setUrl] = useState('');
  const itemId = params.route.params.itemId;
  const activity = readActivity(itemId);
  return (
    <>
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
      {
        activity ? (
          <>
          <Text>Updating Activity {activity._id?.toHexString()}</Text>
          <Text>Name:</Text>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            placeholder={"Name: "+activity.name}
            defaultValue={activity.name}
            onChangeText={text => setName(text)}
          />
          <Text>Display Name:</Text>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            placeholder={"Display Name: "+activity.displayName}
            defaultValue={activity.displayName}
            onChangeText={text => setDisplayName(text)}
          />
          <Text>Category:</Text>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            placeholder={"Category: "+activity.category}
            defaultValue={activity.category}
            onChangeText={text => setCategory(text)}
          />
          <Text>Notes:</Text>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            placeholder={"Notes: "+activity.notes ? activity.notes : "none"}
            defaultValue={activity.notes}
            onChangeText={text => setNotes(text)}
          />
          <Text>URL:</Text>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            placeholder={"URL: "+activity.url ? activity.url : ""}
            defaultValue={activity.url}
            onChangeText={text => setUrl(text)}
          />
          <Button title="Save changes" onPress={() => {saveUpdates(realm, activity, name, displayName, category, notes, url)}} />
          <Button title="Delete activity" onPress={() => {}} />
          </>
        ) : <Text>Failed to load activity</Text>
      }
    </View>
    </>
  )
}