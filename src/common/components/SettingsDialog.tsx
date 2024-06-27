import palette from "@constants/colors";
import DynamicPreview from "@features/counter-preview/DynamicPreview";
import { useGameContext } from "@features/new-game/gameContext";
import { usePresetsContext } from "@features/presets/presetsContext";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Dialog, Portal, Button, Checkbox } from "react-native-paper";

type SettingsDialogProps = {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
};
export default function SettingsDialog({ visible, setVisible }: SettingsDialogProps) {
  const { game, updatePlayers } = useGameContext();
  const { getPreset, editPreset } = usePresetsContext();
  const [updatePreset, setUpdatePreset] = useState(false);
  const gameInitialState = useRef(game);

  useEffect(() => {
    if (visible) gameInitialState.current = game;
  }, [visible]);

  const closeDialog = () => {
    setVisible(false);
  };

  const handleSubmit = async () => {
    if (updatePreset && game.presetId) {
      //Set loading
      const preset = getPreset(game.presetId);
      const updatedPreset = {
        ...preset,
        players: game.players.map((player) => ({
          ...player,
          backgroundColor: game.players.find((p) => p.playerId === player.playerId)!
            .backgroundColor,
          backgroundTheme: game.players.find((p) => p.playerId === player.playerId)!
            .backgroundTheme,
        })),
      };

      await editPreset(updatedPreset);
    }
    closeDialog();
  };

  const handleCancel = () => {
    console.log(gameInitialState.current);
    updatePlayers(
      game.players.map((player) => ({
        ...player,
        backgroundColor: gameInitialState.current.players.find(
          (p) => p.playerId === player.playerId,
        )!.backgroundColor,
        backgroundTheme: gameInitialState.current.players.find(
          (p) => p.playerId === player.playerId,
        )!.backgroundTheme,
      })),
    );
    closeDialog();
  };

  return (
    <Portal>
      <Dialog style={styles.dialog} visible={visible} onDismiss={handleCancel}>
        <Dialog.Title style={styles.dialogTitle}>Game Settings</Dialog.Title>
        <Dialog.Content>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Players</Text>
            <DynamicPreview players={game.players} showStartingLifes={false} />
          </View>
          {game.presetId && (
            <Checkbox.Item
              label="Update preset"
              status={updatePreset ? "checked" : "unchecked"}
              onPress={() => setUpdatePreset(!updatePreset)}
              position="leading"
              color={palette.primary[500]}
              labelStyle={styles.checkboxLabel}
            />
          )}
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            contentStyle={styles.dialogButton}
            mode="outlined"
            textColor={palette.neutrals.white}
            onPress={handleCancel}>
            Cancel
          </Button>
          <Button
            contentStyle={styles.dialogButton}
            mode="contained"
            buttonColor={palette.primary[500]}
            textColor={palette.neutrals.white}
            onPress={handleSubmit}>
            Accept
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: palette.grays[100],
    paddingHorizontal: 15,
    paddingVertical: 10,
    lineHeight: 25,
  },
  dialog: {
    backgroundColor: palette.grays[900],
    borderRadius: 5,
  },
  dialogTitle: {
    color: palette.neutrals.white,
  },
  dialogButton: { paddingHorizontal: 10 },
  section: {
    paddingHorizontal: 5,
    paddingTop: 5,
    paddingBottom: 12,
  },
  sectionTitle: {
    color: palette.neutrals.white,
    fontSize: 16,
    marginBottom: 10,
  },
  checkboxLabel: { color: palette.neutrals.white, textAlign: "left" },
});
