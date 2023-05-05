import Realm from "realm";
import { createRealmContext } from '@realm/react';
import { SavedGame } from "./contentTypes";

class GameState extends Realm.Object<GameState> {
    _id!: Realm.BSON.ObjectId;
    selectedIds!: string[];
    boardMap!: string;
    static schema = {
        name: "GameState",
        embedded: true,
        properties: {
            _id: "objectId",
            selectedIds: "string[]",
            boardMap: "string[]"
        },
        primaryKey: "_id"
    };
};

export class Games extends Realm.Object<Games> {
  _id!: Realm.BSON.ObjectId;
  name!: string;
  gameContents!: string;
   static schema = {
    name: "Games",
    properties: {
      _id: "objectId",
      name: "string",
      gameState: "GameState"
    },
    primaryKey: "_id"
  };
}

const realmConfig: Realm.Configuration = {
    schema: [Games],
};

export const {RealmProvider, useRealm, useObject, useQuery} = createRealmContext(realmConfig);

export function loadSavedGames(realm: Realm) {
  console.log("Loading saved games");
  const savedGames = realm.objects<Games>('Games');
  return savedGames;
}
