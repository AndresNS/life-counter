import palette from "@constants/colors";
import { Player } from "@constants/types";
import { StyleSheet, View } from "react-native";

import CounterPreview from "./CounterPreview";

interface ThreePlayersPreviewProps {
  players: Player[];
}

export default function ThreePlayersPreview({ players }: ThreePlayersPreviewProps): JSX.Element {
  return (
    <View style={styles.container}>
      <View style={styles.leftCounters}>
        <CounterPreview player={players[1]} />
        <CounterPreview player={players[0]} />
      </View>
      <View style={styles.rightCounter}>
        <CounterPreview player={players[2]} />
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
