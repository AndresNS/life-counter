import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";

import { useKeepAwake } from "expo-keep-awake";
import Counter from "../src/components/Counter";
import { useLocalSearchParams } from "expo-router";

export default function Game() {
  const params = useLocalSearchParams();
  const { startingLife } = params;
  useKeepAwake();

  return (
    <View style={styles.container}>
      <Counter backgroundColor="#909" startingLife={Number(startingLife)} flip />
      <Counter startingLife={Number(startingLife)} />
      <StatusBar style="auto" hidden />
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
});
