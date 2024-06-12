import { Player } from "@constants/types";

import ThreePlayersLayout from "./threePlayers";
import TwoPlayersLayout from "./twoPlayers";

const LayoutComponentMap: { [key: number]: React.FC<any> } = {
  2: TwoPlayersLayout,
  3: ThreePlayersLayout,
};

type DynamicGameLayoutProps = {
  players: Player[];
};

export default function DynamicGameLayout({ players }: DynamicGameLayoutProps) {
  const Component = LayoutComponentMap[players.length];
  return Component ? <Component players={players} /> : null;
}