import palette from "@constants/colors";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Button, Dialog, Menu, Portal } from "react-native-paper";

import { usePresetsContext } from "./presetsContext";
import { Preset } from "./types";

interface IPresetListItemProps {
  preset: Preset;
}

export default function PresetListItem({
  preset: { id, name, startingLife, players },
}: IPresetListItemProps): JSX.Element {
  const { editPreset, deletePreset } = usePresetsContext();
  const [menuVisible, setMenuVisible] = useState(false);
  const [editDialogVisible, setEditDialogVisible] = useState(false);
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [presetName, setPresetName] = useState(name);
  const [presetStartingLife, setPresetStartingLife] = useState(startingLife.toString());

  const handleItemPress = () => {
    router.push({ pathname: "/game", params: { name, startingLife, players } });
  };

  const openMenu = () => setMenuVisible(true);

  const closeMenu = () => setMenuVisible(false);

  const openEditDialog = () => {
    closeMenu();
    setEditDialogVisible(true);
  };

  const closeEditDialog = () => setEditDialogVisible(false);

  const confirmEdit = () => {
    closeEditDialog();
    // set Loading
    const updatedPreset: Preset = {
      id,
      name: presetName,
      startingLife: Number(presetStartingLife),
      players,
    };

    editPreset(updatedPreset);
  };

  const openDeleteDialog = () => {
    closeMenu();
    setDeleteDialogVisible(true);
  };

  const closeDeleteDialog = () => setDeleteDialogVisible(false);

  const confirmDelete = () => {
    closeDeleteDialog();
    // set Loading

    deletePreset(id);
  };

  return (
    <Pressable onPress={handleItemPress}>
      <View style={styles.container}>
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{name}</Text>
          <View style={styles.settings}>
            <View style={styles.settingItem}>
              <FontAwesome name="heart" color={palette.neutrals.white} size={25} />
              <Text style={styles.settingItemLabel}>{startingLife}</Text>
            </View>
            <View style={styles.settingItem}>
              <FontAwesome name="users" color={palette.neutrals.white} size={25} />
              <Text style={styles.settingItemLabel}>{players.length}</Text>
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
            onPress={openEditDialog}
            title="Edit"
          />
          <Menu.Item
            titleStyle={{ color: palette.neutrals.white }}
            onPress={openDeleteDialog}
            title="Delete"
          />
        </Menu>
        <Portal>
          <Dialog style={styles.dialog} visible={editDialogVisible} onDismiss={closeEditDialog}>
            <Dialog.Title style={styles.dialogTitle}>Edit Preset</Dialog.Title>
            <Dialog.Content>
              <View style={{ gap: 10 }}>
                <TextInput
                  placeholder="Preset Name"
                  style={styles.textInput}
                  value={presetName}
                  onChangeText={setPresetName}
                  autoFocus
                />
                <TextInput
                  placeholder="Starting Life"
                  style={styles.textInput}
                  value={presetStartingLife}
                  onChangeText={setPresetStartingLife}
                  keyboardType="numeric"
                />
              </View>
            </Dialog.Content>
            <Dialog.Actions>
              <Button
                mode="outlined"
                contentStyle={styles.dialogButton}
                textColor={palette.primary[500]}
                onPress={closeEditDialog}>
                Cancel
              </Button>
              <Button
                contentStyle={styles.dialogButton}
                mode="contained"
                buttonColor={palette.primary[500]}
                textColor={palette.neutrals.white}
                onPress={confirmEdit}>
                Save Changes
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
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
