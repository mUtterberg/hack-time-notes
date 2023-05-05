import Realm from "realm";
import { createRealmContext } from '@realm/react';

// Define your object model
export class Activities extends Realm.Object<Activities> {
  _id!: Realm.BSON.ObjectId;
  name!: string;
   static schema = {
    name: "Activities",
    properties: {
      _id: "objectId",
      name: "string"
    },
    primaryKey: "_id"
  };
}

// Create a configuration object
const realmConfig: Realm.Configuration = {
  schema: [Activities],
};

// Create a realm context
export const {RealmProvider, useRealm, useObject, useQuery} = createRealmContext(realmConfig);
