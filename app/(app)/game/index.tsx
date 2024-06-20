import DynamicGameLayout from "@common/layouts/DynamicGameLayout";
import { useKeepAwake } from "expo-keep-awake";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";

export default function Game(): JSX.Element {
  useKeepAwake();

  return (
    <View style={styles.container}>
      <DynamicGameLayout />
      <StatusBar hidden />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
