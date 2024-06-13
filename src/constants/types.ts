export type LifeTotal = {
  [key: string]: number;
};

export type Player = {
  playerId: string;
  backgroundColor: string;
  startingLife: number;
  lifeTotal: number;
};
