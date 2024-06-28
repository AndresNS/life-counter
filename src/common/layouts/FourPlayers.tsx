import CounterDivider from "@common/components/CounterDivider";
import palette from "@constants/colors";
import Counter from "@features/counter/Counter";
import { useGameContext } from "@features/new-game/gameContext";
import { StyleSheet, View } from "react-native";

const totalPlayers = 4;

export default function FourPlayersLayout(): JSX.Element {
  const { game } = useGameContext();

  return (
    <View style={styles.container}>
      <View style={styles.counterContainer}>
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
      <View style={styles.counterContainer}>
        <Counter player={game.players[2]} rotation="180" totalPlayers={totalPlayers} />
        <Counter player={game.players[3]} rotation="0" totalPlayers={totalPlayers} />
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
  counterContainer: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    gap: 5,
  },
});
