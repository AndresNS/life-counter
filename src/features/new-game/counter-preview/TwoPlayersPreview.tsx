import palette from "@constants/colors";
import { Player } from "@constants/types";
import { StyleSheet, View } from "react-native";

import CounterPreview from "./CounterPreview";

interface TwoPlayersPreviewProps {
  players: Player[];
}

export default function TwoPlayersPreview({ players }: TwoPlayersPreviewProps): JSX.Element {
  return (
    <View style={styles.container}>
      <CounterPreview player={players[0]} />
      <CounterPreview player={players[1]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: palette.neutrals.black,
    gap: 4,
    padding: 5,
    borderRadius: 10,
  },
});
