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
    // embedded: true,
    properties: {
      b: {type: 'list', objectType: 'ClevelandActivity', default: []},
      i: {type: 'list', objectType: 'ClevelandActivity', default: []},
      n: {type: 'list', objectType: 'ClevelandActivity', default: []},
      e: {type: 'list', objectType: 'ClevelandActivity', default: []},
      o: {type: 'list', objectType: 'ClevelandActivity', default: []},
    },
  };
}

export class Game extends Realm.Object<Game> {
  _id!: Realm.BSON.ObjectId;
  name!: string;
  mode!: string;
  selectedIds!: string[];
  boardMap!: BoardMap;
   static schema = {
    name: "Game",
    properties: {
      _id: "objectId",
      name: "string",
      mode: "string",
      selectedIds: "string[]",
      boardMap: "BoardMap",
    },
    primaryKey: "_id"
  };
}

const realmConfig: Realm.Configuration = {
    schema: [BoardMap, ClevelandActivity, Game],
    // DEV ONLY
    deleteRealmIfMigrationNeeded: true,
};

export const GameContext = createRealmContext(realmConfig);
  
export function loadSavedGames(realm: Realm) {
  const savedGames = realm.objects<Game>('Game');
  return savedGames;
}
