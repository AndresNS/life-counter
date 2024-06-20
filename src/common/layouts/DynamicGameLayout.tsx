import { useGameContext } from "@features/new-game/gameContext";

import FourPlayersLayout from "./FourPlayers";
import ThreePlayersLayout from "./ThreePlayers";
import TwoPlayersLayout from "./TwoPlayers";

const LayoutComponentMap: { [key: number]: React.FC<any> } = {
  2: TwoPlayersLayout,
  3: ThreePlayersLayout,
  4: FourPlayersLayout,
};

export default function DynamicGameLayout() {
  const { game } = useGameContext();
  const Component = LayoutComponentMap[game.players.length];

  return Component ? <Component players={game.players} /> : null;
}
