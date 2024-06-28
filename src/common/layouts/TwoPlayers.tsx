import CounterDivider from "@common/components/CounterDivider";
import palette from "@constants/colors";
import Counter from "@features/counter/Counter";
import { useGameContext } from "@features/new-game/gameContext";
import { StyleSheet, View } from "react-native";

const totalPlayers = 2;

export default function TwoPlayersLayout(): JSX.Element {
  const { game } = useGameContext();

  return (
    <View style={styles.container}>
      <Counter player={game.players[0]} rotation="270" totalPlayers={totalPlayers} />
      <CounterDivider />
      <Counter player={game.players[1]} rotation="90" totalPlayers={totalPlayers} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.neutrals.black,
    width: "100%",
    height: "100%",
    gap: 4,
    padding: 5,
  },
});
