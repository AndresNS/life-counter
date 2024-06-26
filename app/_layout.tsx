import { GameContextProvider } from "@features/new-game/gameContext";
import { PresetsContextProvider } from "@features/presets/presetsContext";
import { Stack } from "expo-router";
import { StyleSheet, View } from "react-native";
import { PaperProvider } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Layout(): JSX.Element {
  return (
    <PresetsContextProvider>
      <GameContextProvider>
        <View style={{ flex: 1, overflow: "hidden" }}>
          <PaperProvider>
            <SafeAreaView style={styles.container}>
              <Stack screenOptions={{ headerShown: false, animation: "none" }} />
            </SafeAreaView>
          </PaperProvider>
        </View>
      </GameContextProvider>
    </PresetsContextProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
