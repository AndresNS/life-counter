import palette from "@constants/colors";
import { FontAwesome } from "@expo/vector-icons";
import { useGameContext } from "@features/new-game/gameContext";
import { useState } from "react";
import { Pressable, View, StyleSheet } from "react-native";

import SettingsDialog from "./SettingsDialog";

export default function CounterDivider() {
  const { restartGame } = useGameContext();
  const [settingsDialogVisible, setSettingsDialogVisible] = useState(false);

  const handleResetPress = () => restartGame();

  const handleOpenSettingsPress = () => setSettingsDialogVisible(true);

  return (
    <View style={styles.divider}>
      <View style={styles.buttonContainer}>
        <Pressable onPress={handleOpenSettingsPress}>
          <FontAwesome name="cog" style={styles.button} />
        </Pressable>
        <Pressable onPress={handleResetPress}>
          <FontAwesome name="refresh" style={styles.button} />
        </Pressable>
      </View>
      <SettingsDialog visible={settingsDialogVisible} setVisible={setSettingsDialogVisible} />
    </View>
  );
}

const styles = StyleSheet.create({
  divider: {
    position: "relative",
    top: -26,
    alignItems: "center",
    width: "100%",
    zIndex: 999,
  },
  buttonContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
    backgroundColor: palette.neutrals.black,
    borderRadius: 50,
    paddingHorizontal: 10,
  },
  button: {
    color: palette.neutrals.white,
    textAlign: "center",
    verticalAlign: "middle",
    fontSize: 36,
    borderWidth: 4,
    borderRadius: 50,
    backgroundColor: palette.neutrals.black,
    padding: 4,
  },
});
