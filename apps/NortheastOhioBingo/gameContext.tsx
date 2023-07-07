import Realm from "realm";
import { createRealmContext } from '@realm/react';

export class ClevelandActivity extends Realm.Object<ClevelandActivity> {
  _id!: Realm.BSON.ObjectId;
  displayName!: string;
  name!: string;
  category!: string;
  notes?: string;
  url?: string;
  freeSpace?: boolean;
  static schema = {
    name: "ClevelandActivity",
    properties: {
      _id: {type: 'objectId', default: new Realm.BSON.ObjectId()},
      displayName: 'string',
      name: 'string',
      category: 'string',
      notes: 'string?',
      url: 'string?',
      freeSpace: 'bool?',
    },
    primaryKey: "_id"
  };
};

export class StatefulActivity extends Realm.Object<StatefulActivity> {
  activity!: ClevelandActivity;
  position!: string;
  static schema = {
    name: "StatefulActivity",
    embedded: true,
    properties: {
      activity: 'ClevelandActivity',
      position: {type: 'string', default: 'n2', indexed: true},
    },
  };
};

export class Game extends Realm.Object<Game> {
  _id!: Realm.BSON.ObjectId;
  name!: string;
  mode!: string;
  active!: boolean;
  selectedIds!: Realm.Set<string>;
  boardValues!: StatefulActivity[];
  static schema = {
    name: "Game",
    properties: {
      _id: {type: "objectId", default: new Realm.BSON.ObjectId()},
      name: {type: "string", default: "New Game"},
      mode: {type: "string", default: "simple"},
      active: {type: "bool", default: true},
      selectedIds: {type: "set", objectType: "string", default: ["n2"]},
      boardValues: {type: "list", objectType: "StatefulActivity", default: []},
    },
    primaryKey: "_id"
  };
}

const realmConfig: Realm.Configuration = {
    schema: [ClevelandActivity, StatefulActivity, Game],
    // DEV ONLY
    deleteRealmIfMigrationNeeded: true,
};

export const GameContext = createRealmContext(realmConfig);
  
export function loadSavedGames(realm: Realm) {
  const savedGames = realm.objects<Game>('Game');
  return savedGames;
}
