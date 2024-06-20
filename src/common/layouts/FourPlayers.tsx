import palette from "@constants/colors";
import { FontAwesome } from "@expo/vector-icons";
import Counter from "@features/counter/Counter";
import { useGameContext } from "@features/new-game/gameContext";
import { Pressable, StyleSheet, View } from "react-native";

const totalPlayers = 4;

export default function FourPlayersLayout(): JSX.Element {
  const { game, updateLifeTotal, restartGame } = useGameContext();

  const handleResetPress = () => restartGame();

  return (
    <View style={styles.container}>
      <View style={styles.counterContainer}>
        <Counter
          style={{ flex: 1 }}
          player={game.players[0]}
          setLifeTotal={updateLifeTotal}
          rotation="180"
          totalPlayers={totalPlayers}
        />
        <Counter
          style={{ flex: 1 }}
          player={game.players[1]}
          setLifeTotal={updateLifeTotal}
          rotation="0"
          totalPlayers={totalPlayers}
        />
      </View>
      <View style={styles.divider}>
        <View style={styles.buttonContainer}>
          <Pressable onPress={handleResetPress}>
            <FontAwesome name="refresh" style={styles.resetButton} />
          </Pressable>
        </View>
      </View>
      <View style={styles.counterContainer}>
        <Counter
          player={game.players[2]}
          setLifeTotal={updateLifeTotal}
          rotation="180"
          totalPlayers={totalPlayers}
        />
        <Counter
          player={game.players[3]}
          setLifeTotal={updateLifeTotal}
          rotation="0"
          totalPlayers={totalPlayers}
        />
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
