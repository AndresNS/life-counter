import palette from "@constants/colors";
import { LifeTotal, Player } from "@constants/types";
import { FontAwesome } from "@expo/vector-icons";
import Counter from "@features/counter/Counter";
import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

interface TwoPlayersLayoutProps {
  players: Player[];
}

export default function TwoPlayersLayout({ players }: TwoPlayersLayoutProps): JSX.Element {
  const startingLifeTotals = players.reduce((accum: LifeTotal, player: Player) => {
    accum[player.playerId] = player.startingLife;
    return accum;
  }, {});

  const [lifeTotals, setLifeTotals] = useState<LifeTotal>(startingLifeTotals);

  const handleResetPress = () => setLifeTotals(startingLifeTotals);

  return (
    <View style={styles.container}>
      <Counter
        backgroundColor={players[0].backgroundColor}
        lifeTotal={lifeTotals[players[0].playerId]}
        playerId={players[0].playerId}
        setLifeTotal={setLifeTotals}
        rotation="270"
        totalPlayers={2}
      />
      <View style={styles.divider}>
        <View style={styles.buttonContainer}>
          <Pressable onPress={handleResetPress}>
            <FontAwesome name="refresh" style={styles.resetButton} />
          </Pressable>
        </View>
      </View>
      <Counter
        backgroundColor={players[1].backgroundColor}
        lifeTotal={lifeTotals[players[1].playerId]}
        playerId={players[1].playerId}
        setLifeTotal={setLifeTotals}
        rotation="90"
        totalPlayers={2}
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
