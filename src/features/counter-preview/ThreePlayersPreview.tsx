import palette from "@constants/colors";
import { Player } from "@constants/types";
import { StyleSheet, View } from "react-native";

import CounterPreview from "./CounterPreview";

interface ThreePlayersPreviewProps {
  players: Player[];
  showStartingLifes: boolean;
}

export default function ThreePlayersPreview({
  players,
  showStartingLifes,
}: ThreePlayersPreviewProps): JSX.Element {
  return (
    <View style={styles.container}>
      <View style={styles.leftCounters}>
        <CounterPreview player={players[1]} showStartingLifes={showStartingLifes} />
        <CounterPreview player={players[0]} showStartingLifes={showStartingLifes} />
      </View>
      <View style={styles.rightCounter}>
        <CounterPreview player={players[2]} showStartingLifes={showStartingLifes} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: palette.neutrals.black,
    padding: 5,
    gap: 4,
    borderRadius: 10,
  },
  leftCounters: {
    flex: 1.5,
    width: "100%",
    gap: 4,
  },
  rightCounter: { flex: 1, height: "100%" },
});
