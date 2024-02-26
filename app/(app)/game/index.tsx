import palette from "@constants/colors";
import { FontAwesome } from "@expo/vector-icons";
import Counter from "@features/counter/Counter";
import { reset } from "@features/counter/counterSlice";
import { useKeepAwake } from "expo-keep-awake";
import { useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Pressable, StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";

export default function Game(): JSX.Element {
  const dispatch = useDispatch();
  const params = useLocalSearchParams();
  const { startingLife } = params;
  useKeepAwake();

  const handleResetPress = () => {
    dispatch(reset({ playerId: 1, startingLife: Number(startingLife) }));
    dispatch(reset({ playerId: 2, startingLife: Number(startingLife) }));
  };

  return (
    <View style={styles.container}>
      <Counter
        backgroundColor={palette.customs[1]}
        startingLife={Number(startingLife)}
        playerId={1}
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
        startingLife={Number(startingLife)}
        playerId={2}
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
