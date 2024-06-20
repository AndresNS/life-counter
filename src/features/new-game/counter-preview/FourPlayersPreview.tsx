import palette from "@constants/colors";
import { Player } from "@constants/types";
import { StyleSheet, View } from "react-native";

import CounterPreview from "./CounterPreview";

interface FourPlayersPreviewProps {
  players: Player[];
}

export default function FourPlayerPreview({ players }: FourPlayersPreviewProps): JSX.Element {
  return (
    <View style={styles.container}>
      <View style={styles.counterContainer}>
        <CounterPreview player={players[1]} />
        <CounterPreview player={players[0]} />
      </View>
      <View style={styles.counterContainer}>
        <CounterPreview player={players[3]} />
        <CounterPreview player={players[2]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.neutrals.black,
    flexDirection: "row",
    padding: 5,
    gap: 4,
    borderRadius: 10,
  },
  counterContainer: {
    flex: 1,
    width: "100%",
    gap: 4,
  },
});
