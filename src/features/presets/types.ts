export type Player = {
  backgroundColor: string;
};

export type Preset = {
  id: string | number[];
  name: string;
  startingLife: number;
  players: Player[];
};
