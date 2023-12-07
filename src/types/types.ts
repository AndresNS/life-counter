type Player = {
  backgroundColor: string;
};

type Preset = {
  id: string;
  name: string;
  startingLife: number;
  players: Player[];
};

export { Player, Preset };
