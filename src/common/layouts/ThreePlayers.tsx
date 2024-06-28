import CounterDivider from "@common/components/CounterDivider";
import palette from "@constants/colors";
import Counter from "@features/counter/Counter";
import { useGameContext } from "@features/new-game/gameContext";
import { StyleSheet, View } from "react-native";

const totalPlayers = 3;

export default function ThreePlayersLayout(): JSX.Element {
  const { game } = useGameContext();

  return (
    <View style={styles.container}>
      <View style={styles.topCounters}>
        <Counter
          style={{ flex: 1 }}
          player={game.players[0]}
          rotation="180"
          totalPlayers={totalPlayers}
        />
        <Counter
          style={{ flex: 1 }}
          player={game.players[1]}
          rotation="0"
          totalPlayers={totalPlayers}
        />
      </View>
      <CounterDivider />
      <View style={styles.bottomCounter}>
        <Counter player={game.players[2]} rotation="90" totalPlayers={totalPlayers} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.neutrals.black,
    alignItems: "center",
    justifyContent: "center",
    padding: 4,
    gap: 3,
  },
  topCounters: {
    flex: 1.5,
    width: "100%",
    flexDirection: "row",
    gap: 5,
  },
  bottomCounter: { flex: 1, width: "100%" },
});
