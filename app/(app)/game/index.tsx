import DynamicGameLayout from "@common/layouts/DynamicGameLayout";
import { Player } from "@constants/types";
import { useKeepAwake } from "expo-keep-awake";
import { useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";

export default function Game(): JSX.Element {
  useKeepAwake();
  const params = useLocalSearchParams();
  const { id, name, players } = params;

  let parsedPlayers: Player[] = [];

  if (typeof players === "string") {
    try {
      parsedPlayers = JSON.parse(players) as Player[];
    } catch (error) {
      console.error("Failed to parse players:", error);
    }
  } else {
    console.error("Players parameter is not a valid string");
  }

  return (
    <View style={styles.container}>
      <DynamicGameLayout players={parsedPlayers} />
      <StatusBar hidden />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
