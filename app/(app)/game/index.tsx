import DynamicGameLayout from "@common/layouts/DynamicGameLayout";
import { useGameContext } from "@features/new-game/gameContext";
import { useKeepAwake } from "expo-keep-awake";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";

export default function Game(): JSX.Element {
  useKeepAwake();

  const { clearGame } = useGameContext();

  useEffect(() => {
    return () => {
      clearGame();
    };
  }, []);

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
