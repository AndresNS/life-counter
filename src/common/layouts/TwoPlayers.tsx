import palette from "@constants/colors";
import { FontAwesome } from "@expo/vector-icons";
import Counter from "@features/counter/Counter";
import { useGameContext } from "@features/new-game/gameContext";
import { Pressable, StyleSheet, View } from "react-native";

const totalPlayers = 2;

export default function TwoPlayersLayout(): JSX.Element {
  const { game, updatePlayerLifeTotal, restartGame } = useGameContext();

  const handleResetPress = () => restartGame();

  return (
    <View style={styles.container}>
      <Counter
        player={game.players[0]}
        setLifeTotal={updatePlayerLifeTotal}
        rotation="270"
        totalPlayers={totalPlayers}
      />
      <View style={styles.divider}>
        <View style={styles.buttonContainer}>
          <Pressable onPress={handleResetPress}>
            <FontAwesome name="refresh" style={styles.resetButton} />
          </Pressable>
        </View>
      </View>
      <Counter
        player={game.players[1]}
        setLifeTotal={updatePlayerLifeTotal}
        rotation="90"
        totalPlayers={totalPlayers}
      />
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
  divider: {
    position: "relative",
    top: -25,
    alignItems: "center",
    width: "100%",
    zIndex: 999,
  },
  buttonContainer: {
    position: "absolute",
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  resetButton: {
    color: palette.neutrals.white,
    textAlign: "center",
    verticalAlign: "middle",
    fontSize: 30,
    borderWidth: 4,
    borderRadius: 50,
    backgroundColor: palette.neutrals.black,
    padding: 4,
  },
});
