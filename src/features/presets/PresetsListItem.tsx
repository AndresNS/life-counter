import palette from "@constants/colors";
import { FontAwesome } from "@expo/vector-icons";
import { AppDispatch } from "@store/configureStore";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Button, Dialog, Menu, Portal } from "react-native-paper";
import { useDispatch } from "react-redux";

import { Preset, deletePreset, editPreset } from "./presetSlice";
import { Player } from "./types";

interface IPresetListItemProps {
  id: string | number[];
  name: string;
  startingLife: number;
  players: Player[];
}

export default function PresetListItem({
  id,
  name,
  startingLife,
  players,
}: IPresetListItemProps): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
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
    setMenuVisible(false);
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

    dispatch(editPreset(updatedPreset));
  };

  const openDeleteDialog = () => {
    setMenuVisible(false);
    setDeleteDialogVisible(true);
  };
  const closeDeleteDialog = () => setDeleteDialogVisible(false);

  const confirmDelete = () => {
    closeDeleteDialog();
    // set Loading

    dispatch(deletePreset(id));
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
        <View>
          <Menu
            contentStyle={{ backgroundColor: palette.grays[900] }}
            visible={menuVisible}
            onDismiss={closeMenu}
            anchor={
              <Pressable style={{ paddingHorizontal: 10, paddingBottom: 10 }} onPress={openMenu}>
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
        </View>
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
              <Button textColor={palette.primary[500]} onPress={closeEditDialog}>
                Cancel
              </Button>
              <Button textColor={palette.primary[500]} onPress={confirmEdit}>
                Save
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
              <Button textColor={palette.primary[500]} onPress={closeDeleteDialog}>
                No
              </Button>
              <Button textColor={palette.primary[500]} onPress={confirmDelete}>
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
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: "row",
    borderRadius: 5,
    marginBottom: 10,
  },
  infoContainer: {
    flex: 1,
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
});
