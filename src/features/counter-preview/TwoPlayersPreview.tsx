import palette from "@constants/colors";
import { Player } from "@constants/types";
import { StyleSheet, View } from "react-native";

import CounterPreview from "./CounterPreview";

interface TwoPlayersPreviewProps {
  players: Player[];
  showStartingLifes: boolean;
}

export default function TwoPlayersPreview({
  players,
  showStartingLifes,
}: TwoPlayersPreviewProps): JSX.Element {
  return (
    <View style={styles.container}>
      <CounterPreview player={players[0]} showStartingLifes={showStartingLifes} />
      <CounterPreview player={players[1]} showStartingLifes={showStartingLifes} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: palette.neutrals.black,
    gap: 4,
    padding: 5,
    borderRadius: 10,
  },
});
