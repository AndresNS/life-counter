import { Player } from "@constants/types";

export type Preset = {
  id: string | number[];
  name: string;
  players: Player[];
};
