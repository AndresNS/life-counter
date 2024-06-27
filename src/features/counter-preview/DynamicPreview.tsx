import { Player } from "@constants/types";

import FourPlayerPreview from "./FourPlayersPreview";
import ThreePlayersPreview from "./ThreePlayersPreview";
import TwoPlayersPreview from "./TwoPlayersPreview";

const LayoutComponentMap: { [key: number]: React.FC<any> } = {
  2: TwoPlayersPreview,
  3: ThreePlayersPreview,
  4: FourPlayerPreview,
};

type DynamicPreviewProps = {
  players: Player[];
  showStartingLifes?: boolean;
};

export default function DynamicPreview({ players, showStartingLifes }: DynamicPreviewProps) {
  const Component = LayoutComponentMap[players.length];

  return Component ? <Component players={players} showStartingLifes={showStartingLifes} /> : null;
}
