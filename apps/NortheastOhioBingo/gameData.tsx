import Realm from "realm";
import _clevelandData from "./cleveland.json";
import { ClevelandActivity, Game, GameContext, StatefulActivity } from "./gameContext";
export const clevelandData = _clevelandData as ClevelandActivity[];

function getRandomSubarray(arr: Array<any>) {

  var shuffled = arr.slice(0);
  var i = arr.length, temp, index;
  const size = 5;

  while (i--) {
      index = Math.floor((i + 1) * Math.random());
      temp = shuffled[index];
      shuffled[index] = shuffled[i];
      shuffled[i] = temp;
  }
  return shuffled.slice(0, size);
};

function validateCategories(jsonCategories: Array<any>, validKeys: Array<string>) {
  for (const key of jsonCategories) {
    if (!validKeys.includes(key)) {
      throw new Error("Invalid key: " + key);
    }
  }
};

function mapActivitiesToStatefulArray(activities: ClevelandActivity[], category: string) {
  const result = new Array<{activity: ClevelandActivity, position: string}>();
  activities.map((activity, index) => {
    result.push({activity: activity, position: category + index.toString()});
  });
  return result;
}

export function createGame(realm: Realm) {
  populateActivities(realm);
  const game = realm.write(() => {
    const game = realm.create<Game>(
      'Game',
      {
        _id: new Realm.BSON.ObjectId(),
        mode: 'simple',
        selectedIds: ["n2"],
        boardValues: createBoard(realm),
        active: true
      },
      Realm.UpdateMode.Modified
      );
    console.log("Created game with id: "+game._id)
    return game;
  });
  return game;
};

function populateActivities(realm: Realm) {
  const activities = realm.objects<ClevelandActivity>('ClevelandActivity');
  realm.write(() => {
    clevelandData.forEach(activity => {
      const existing = activities.filtered('name = $0', activity.name).length;
      if (existing > 1) {
        throw new Error("Found "+existing+" records for activity "+activity.name);
      } else if (existing === 0) {
        realm.create<ClevelandActivity>(
          'ClevelandActivity',
          {
            _id: new Realm.BSON.ObjectId(),
            displayName: activity.displayName,
            name: activity.name,
            category: activity.category,
            notes: activity.notes,
            url: activity.url,
            freeSpace: activity.freeSpace,
          },
          Realm.UpdateMode.Modified
        );
      }
    });
  });
}

function createBoard(realm: Realm) {
  // const categories = ["b", "i", "n", "e", "o"];
  const activityArr = new Array<ClevelandActivity>();
  var activitySample = {
    b: activityArr, i: activityArr, n: activityArr, e: activityArr, o: activityArr
  }

  const clevelandActivities = realm.objects<ClevelandActivity>('ClevelandActivity');
  validateCategories(clevelandActivities.map( i => i.category), Object.keys(activitySample));
  for (var [key, values] of Object.entries(activitySample)) {
    activitySample[key] = getRandomSubarray(clevelandActivities.filter(i => i.category === key && i.freeSpace !== true));
  }

  // Set free space
  const freeSpace = clevelandActivities.find( i => i.freeSpace === true)
  if (freeSpace === undefined) {
    throw new Error("Could not find free space");
  }
  activitySample.n[2] = freeSpace;

  // Add position data
  const boardValues = new Array<StatefulActivity>();
  for (var [key, values] of Object.entries(activitySample)) {
    boardValues.push(...mapActivitiesToStatefulArray(values, key));
  }
  return boardValues;
}

export function loadSavedGame(realm: Realm, id: Realm.BSON.ObjectId) {
  const savedGames = realm.objects<Game>('Game');
  var game = realm.objects<Game>('Game').filtered('_id = $0', id)[0];
  console.log("Game from id "+game._id)
  return game;
};

export function loadAllGames(realm: Realm) {
  const savedGames = realm.objects<Game>('Game');
  return savedGames;
}

export function setGameMode(
  realm: Realm,
  game: Game,
  gameMode: string = 'simple',
) {
  realm.write(() => {
    game.mode = gameMode;
  });
}

export function setGamePlay(
  realm: Realm,
  game: Game,
  gamePlay: boolean = true,
) {
  console.log("Setting game.active for \""+game._id+"\" to "+gamePlay)
  realm.write(() => {
    game.active = gamePlay;
  });
}

export function setResolution(
  realm: Realm,
  game: Game,
  resolution: string,
) {
  realm.write(() => {
    game.resolution = resolution;
  });
}

export function setWinningIds(
  realm: Realm,
  game: Game,
  winningIds: Realm.Set<string>,
) {
  realm.write(() => {
    game.winningIds = winningIds;
  });
}

export function addSelectedId(
  realm: Realm,
  game: Game,
  selectedId: string,
) {
  realm.write(() => {
    game.selectedIds.add(selectedId);
  });
}

export function updateSavedGame(
  realm: Realm,
  game: Game,
  gameMode: string = 'simple',
  selectedIds: Realm.Set<string>,
  boardValues: StatefulActivity[],
  active: boolean = true
  ) {
  realm.write(() => {
    game.mode = gameMode;
    game.selectedIds = selectedIds;
    game.boardValues = boardValues;
    game.active = active;
  });
}
