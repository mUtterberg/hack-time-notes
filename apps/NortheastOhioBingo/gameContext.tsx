import Realm from "realm";
import { createRealmContext } from '@realm/react';
import { SavedGame } from "./contentTypes";

class GameState extends Realm.Object<GameState> {
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
    };
};

export class Game extends Realm.Object<Game> {
  _id!: Realm.BSON.ObjectId;
  name!: string;
  gameState!: GameState;
   static schema = {
    name: "Game",
    properties: {
      _id: "objectId",
      name: "string",
      gameState: "GameState",
    },
    primaryKey: "_id"
  };
}

const realmConfig: Realm.Configuration = {
    schema: [Game, GameState],
    // DEV ONLY
    deleteRealmIfMigrationNeeded: true,
};

export const GameContext = createRealmContext(realmConfig);
// export const {RealmProvider, useRealm, useObject, useQuery} = createRealmContext(realmConfig);

export function loadSavedGames(realm: Realm) {
  console.log("Loading saved games");
  const savedGames = realm.objects<Game>('Game');
  return savedGames;
}
