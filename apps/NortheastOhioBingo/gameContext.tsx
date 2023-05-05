import Realm from "realm";
import { createRealmContext } from '@realm/react';

export class ClevelandActivity extends Realm.Object<ClevelandActivity> {
  // _id!: Realm.BSON.ObjectId;
  displayName!: string;
  name!: string;
  category!: string;
  notes?: string;
  url?: string;
  freeSpace?: boolean;
  tmp?: string;
  static schema = {
    name: "ClevelandActivity",
    properties: {
      // _id: 'objectId',
      displayName: 'string',
      name: 'string',
      category: 'string',
      notes: 'string?',
      url: 'string?',
      freeSpace: 'bool?',
      tmp: 'string?',
    }
  }
};

export class BoardMap extends Realm.Object<BoardMap> {
  b!: ClevelandActivity[];
  i!: ClevelandActivity[];
  n!: ClevelandActivity[];
  e!: ClevelandActivity[];
  o!: ClevelandActivity[];
  static schema = {
    name: "BoardMap",
    embedded: true,
    properties: {
      b: {type: 'list', objectType: 'ClevelandActivity'},
      i: {type: 'list', objectType: 'ClevelandActivity'},
      n: {type: 'list', objectType: 'ClevelandActivity'},
      e: {type: 'list', objectType: 'ClevelandActivity'},
      o: {type: 'list', objectType: 'ClevelandActivity'},
    },
  };
}

export class GameState extends Realm.Object<GameState> {
  selectedIds!: string[];
  boardMap?: BoardMap;
  // boardValues?: string[];
  static schema = {
    name: "GameState",
    embedded: true,
    properties: {
      _id: "objectId",
      selectedIds: "string[]",
      boardMap: "BoardMap?",
      // boardValues: "string[]?",
    },
  };
};

export class Game extends Realm.Object<Game> {
  _id!: Realm.BSON.ObjectId;
  name!: string;
  mode!: string;
  gameState!: GameState;
   static schema = {
    name: "Game",
    properties: {
      _id: "objectId",
      name: "string",
      mode: "string",
      gameState: "GameState",
    },
    primaryKey: "_id"
  };
}

const realmConfig: Realm.Configuration = {
    schema: [BoardMap, ClevelandActivity, Game, GameState],
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
