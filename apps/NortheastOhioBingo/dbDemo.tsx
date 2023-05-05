import React from 'react';
import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import Realm from 'realm';
import { Activities, useObject, useQuery, useRealm } from './contentContext';

import { clevelandData } from './content';
import { bannerStyles } from './styles';

type DatabaseMonitorProps = {
  name: string;
};

function loadClevelandData(realm: Realm) {
  console.log("Loading data from cleveland.json")
  clevelandData.forEach((activity) => {
    createActivity(activity.name, realm);
  });
};

function createActivity(name: String, realm: Realm) {
  console.log("Creating activity ("+name+")");
  realm.write(() => {
    realm.create('Activities', {
      name: name,
      _id: new Realm.BSON.ObjectId()
    });
  });
  return
};

export function DatabaseMonitor({name}: DatabaseMonitorProps) {
  const realm = useRealm();
  const [activeActivity, setActiveActivity] = useState<Activities>();
  const [filteredActivities, setfilteredActivities] = useState<Realm.Results<Activities>>();
  const activities = useQuery(Activities);
  const sortActivities = (reversed: true | false) => {
    const sorted = activities.sorted('name', reversed);
    setfilteredActivities(sorted);
  };
  const filterActivities = (filter: 'BEGINSWITH' | 'ENDSWITH', letter: string) => {
    // Use [c] for case-insensitivity.
    const filtered = activities.filtered(`name ${filter}[c] "${letter}"`);
    setfilteredActivities(filtered);
    if (filtered.length > 0) {
      setActiveActivity(filtered[0]);
    }
  };

  return (
    <View>
      <View>
        <Pressable
          style={bannerStyles.button}
          onPress={() => {loadClevelandData(realm)}}
        >
          <Text style={bannerStyles.buttonText}>Reset activity data</Text>
        </Pressable>
      </View>
      <TextInput
        placeholder='Search for an activity'
        onChangeText={newText => filterActivities('BEGINSWITH', newText)}
      />
      <Text>Results: {filteredActivities?.length || 0}</Text>
      <Text>First Result: {activeActivity?.name} ({activeActivity?._id.id})</Text>
    </View>
  )
};
