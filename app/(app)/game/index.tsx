import palette from "@constants/colors";
import { FontAwesome } from "@expo/vector-icons";
import Counter from "@features/counter/Counter";
import { useKeepAwake } from "expo-keep-awake";
import { useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

export default function Game(): JSX.Element {
  useKeepAwake();
  const params = useLocalSearchParams();
  const { startingLife } = params;

  const [lifeTotals, setLifeTotals] = useState({
    "1": Number(startingLife),
    "2": Number(startingLife),
  });

  const handleResetPress = () => {
    setLifeTotals({ "1": Number(startingLife), "2": Number(startingLife) });
  };

  return (
    <View style={styles.container}>
      <Counter
        backgroundColor={palette.customs[1]}
        lifeTotal={lifeTotals[1]}
        playerId="1"
        setLifeTotal={setLifeTotals}
        flip
      />
      <View style={styles.divider}>
        <View style={styles.buttonContainer}>
          <Pressable onPress={handleResetPress}>
            <FontAwesome name="refresh" style={styles.resetButton} />
          </Pressable>
        </View>
      </View>
      <Counter
        backgroundColor={palette.customs[5]}
        lifeTotal={lifeTotals[2]}
        playerId="2"
        setLifeTotal={setLifeTotals}
      />
      <StatusBar hidden />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: palette.neutrals.black,
    alignItems: "center",
    justifyContent: "center",
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
