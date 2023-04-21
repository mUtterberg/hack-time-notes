export interface ClevelandData {
  displayName: string;
  name: string;
  category: string;
  notes?: string;
  url?: string;
  freeSpace?: boolean;
}

export type GameContent = {
  [b: string]: Array<ClevelandData>,
  i: Array<ClevelandData>,
  n: Array<ClevelandData>,
  e: Array<ClevelandData>,
  o: Array<ClevelandData>
};
