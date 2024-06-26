import { isUniformArray } from "@common/lib/helpers";
import palette from "@constants/colors";
import { Player } from "@constants/types";
import { FontAwesome } from "@expo/vector-icons";
import { useGameContext } from "@features/new-game/gameContext";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Button, Dialog, Menu, Portal } from "react-native-paper";

import { usePresetsContext } from "./presetsContext";
import { Preset } from "./types";

interface IPresetListItemProps {
  preset: Preset;
}

const getStartingLifes = (players: Player[]) => {
  const startingLifes = players.map((player) => player.startingLife);

  if (isUniformArray(startingLifes)) return [startingLifes[0]];

  return startingLifes;
};

export default function PresetListItem({ preset }: IPresetListItemProps): JSX.Element {
  const { deletePreset } = usePresetsContext();
  const { newGame } = useGameContext();
  const [menuVisible, setMenuVisible] = useState(false);
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);

  const handleItemPress = () => {
    newGame({ players: preset.players });

    router.push({
      pathname: "/game",
    });
  };

  const handleEditPresetPress = () => {
    newGame({ players: preset.players });
    closeMenu();

    router.push({
      pathname: "/edit-preset",
      params: { preset: JSON.stringify(preset), presetId: preset.id },
    });
  };

  const openMenu = () => setMenuVisible(true);

  const closeMenu = () => setMenuVisible(false);

  const openDeleteDialog = () => {
    closeMenu();
    setDeleteDialogVisible(true);
  };

  const closeDeleteDialog = () => setDeleteDialogVisible(false);

  const confirmDelete = () => {
    closeDeleteDialog();
    // set Loading

    deletePreset(preset.id);
  };

  return (
    <Pressable onPress={handleItemPress}>
      <View style={styles.container}>
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{preset.name}</Text>
          <View style={styles.settings}>
            <View style={styles.settingItem}>
              <FontAwesome name="users" color={palette.neutrals.white} size={25} />
              <Text style={styles.settingItemLabel}>{preset.players.length}</Text>
            </View>
            <View style={styles.settingItem}>
              <FontAwesome name="heart" color={palette.neutrals.white} size={25} />
              <Text style={styles.settingItemLabel}>
                {getStartingLifes(preset.players).join("/")}
              </Text>
            </View>
          </View>
        </View>
        <Menu
          contentStyle={{ backgroundColor: palette.grays[900] }}
          visible={menuVisible}
          onDismiss={closeMenu}
          anchor={
            <Pressable style={styles.menuButton} onPress={openMenu}>
              <FontAwesome name="ellipsis-v" color={palette.neutrals.white} size={25} />
            </Pressable>
          }>
          <Menu.Item
            titleStyle={{ color: palette.neutrals.white }}
            onPress={handleEditPresetPress}
            title="Edit"
          />
          <Menu.Item
            titleStyle={{ color: palette.neutrals.white }}
            onPress={openDeleteDialog}
            title="Delete"
          />
        </Menu>
        <Portal>
          <Dialog style={styles.dialog} visible={deleteDialogVisible} onDismiss={closeDeleteDialog}>
            <Dialog.Title style={styles.dialogTitle}>Confirm Delete</Dialog.Title>
            <Dialog.Content>
              <Text style={styles.dialogText}>Are you sure you want to delete this preset?</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button
                contentStyle={styles.dialogButton}
                mode="outlined"
                textColor={palette.neutrals.white}
                onPress={closeDeleteDialog}>
                No
              </Button>
              <Button
                contentStyle={styles.dialogButton}
                mode="contained"
                buttonColor={palette.primary[500]}
                textColor={palette.neutrals.white}
                onPress={confirmDelete}>
                Yes
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: palette.grays[800],
    flexDirection: "row",
    borderRadius: 5,
    marginBottom: 10,
  },
  infoContainer: {
    flex: 1,
    paddingVertical: 16,
    paddingLeft: 20,
  },
  title: {
    color: palette.neutrals.white,
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
  settings: {
    flexDirection: "row",
    gap: 22,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  settingItemLabel: {
    color: palette.neutrals.white,
    fontSize: 20,
  },
  textInput: {
    backgroundColor: palette.grays[100],
    padding: 10,
  },
  dialog: {
    backgroundColor: palette.grays[900],
    borderRadius: 5,
  },
  dialogTitle: {
    color: palette.neutrals.white,
  },
  dialogText: {
    color: palette.neutrals.white,
    fontSize: 16,
  },
  dialogButton: { paddingHorizontal: 10 },
  menuButton: {
    flex: 1,
    padding: 15,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
});
