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
      <View>
        <Pressable onPress={handleResetPress}>
          <FontAwesome name="refresh" style={styles.resetButton} />
        </Pressable>
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
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    gap: 8,
    padding: 5,
  },
  resetButton: {
    color: "#ffffff",
    backgroundColor: "#333333",
    fontSize: 24,
    padding: 8,
  },
});
