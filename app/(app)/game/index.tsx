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
    gap: 6,
    padding: 5,
  },
  divider: {
    position: "relative",
    width: "100%",
    zIndex: 999,
  },
  buttonContainer: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translateX(-50%) translateY(-50%)",
    borderRadius: 50,
    padding: 6,
    backgroundColor: palette.neutrals.black,
  },
  resetButton: {
    color: palette.neutrals.white,
    fontSize: 30,
    borderColor: palette.neutrals.black,
    borderWidth: 2,
    borderRadius: 50,
    backgroundColor: palette.neutrals.black,
    padding: 4,
  },
});
