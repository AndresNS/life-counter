import Button from "@common/components/Button";
import DefaultLayout from "@common/layouts/default";
import palette from "@constants/colors";
import { FontAwesome } from "@expo/vector-icons";
import { usePresetsContext } from "@features/presets/presetsContext";
import { Player, Preset } from "@features/presets/types";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Dialog, Portal, Button as ButtonRN, Checkbox } from "react-native-paper";
import uuid from "react-native-uuid";

const startingLifeValues = [20, 40, 100];
const totalPlayersValues = [2, 3, 4];
const defaultPlayers: Player[] = [
  { backgroundColor: palette.customs[1] },
  { backgroundColor: palette.customs[2] },
];

export default function NewGame(): JSX.Element {
  const { addPreset } = usePresetsContext();
  const [startingLifeIndex, setStartingLifeIndex] = useState(0);
  const [saveAsPreset, setSaveAsPreset] = useState(false);
  const [presetName, setPresetName] = useState("");
  const [totalPlayersIndex, setTotalPlayersIndex] = useState(0);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [startingLife, setStartingLife] = useState("");
  // const [timer, setTimer] = useState(false);
  // const [players, setPlayers] = useState<Player[]>(defaultPlayers);

  useEffect(() => {
    if (startingLifeIndex !== startingLifeValues.length)
      setStartingLife(startingLifeValues[startingLifeIndex].toString());
  }, [startingLifeIndex]);

  const handleStartGamePress = async () => {
    const newPreset: Preset = {
      id: uuid.v4(),
      name: presetName,
      startingLife: Number(startingLife),
      players: defaultPlayers,
    };

    if (saveAsPreset) addPreset(newPreset);

    router.replace({ pathname: "/game", params: newPreset });
  };

  const showDialog = () => setDialogVisible(true);
  const closeDialog = () => setDialogVisible(false);

  const handleCustomStartingLife = () => {
    setStartingLifeIndex(startingLifeValues.length);
    setStartingLife("");

    showDialog();
  };

  return (
    <DefaultLayout title="New Game">
      <View style={styles.container}>
        <View style={styles.settingsContainer}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}> Starting Life </Text>
            <View style={styles.sectionOptions}>
              {[
                ...startingLifeValues.map((startingLifeValue, index) => (
                  <Pressable
                    style={[
                      styles.optionButton,
                      index === startingLifeIndex ? styles.optionButtonSelected : null,
                    ]}
                    key={index}
                    onPress={() => setStartingLifeIndex(index)}>
                    <Text style={styles.optionText} selectable={false}>
                      {startingLifeValue}
                    </Text>
                  </Pressable>
                )),
                <Pressable
                  style={[
                    styles.optionButton,
                    startingLifeIndex === startingLifeValues.length
                      ? styles.optionButtonSelected
                      : null,
                  ]}
                  key={startingLifeValues.length}
                  onPress={handleCustomStartingLife}>
                  {startingLifeIndex === startingLifeValues.length && startingLife !== "" ? (
                    <View style={{ flexDirection: "row", gap: 8 }}>
                      <Text style={styles.optionText} selectable={false}>
                        {startingLife}
                      </Text>
                      <FontAwesome name="pencil" size={16} color={palette.neutrals.white} />
                    </View>
                  ) : (
                    <FontAwesome name="edit" size={20} color={palette.neutrals.white} />
                  )}
                </Pressable>,
              ]}
            </View>
            <Portal>
              <Dialog style={styles.dialog} visible={dialogVisible} onDismiss={closeDialog}>
                <Dialog.Title style={styles.dialogTitle}>Custom Starting Life</Dialog.Title>
                <Dialog.Content>
                  <TextInput
                    placeholder="Insert Starting Life"
                    style={styles.textInput}
                    value={startingLife}
                    onChangeText={setStartingLife}
                    keyboardType="numeric"
                    autoFocus
                  />
                </Dialog.Content>
                <Dialog.Actions>
                  <ButtonRN
                    contentStyle={styles.dialogButton}
                    mode="outlined"
                    textColor={palette.neutrals.white}
                    onPress={closeDialog}>
                    Cancel
                  </ButtonRN>
                  <ButtonRN
                    contentStyle={styles.dialogButton}
                    mode="contained"
                    buttonColor={palette.primary[500]}
                    textColor={palette.neutrals.white}
                    onPress={closeDialog}>
                    Accept
                  </ButtonRN>
                </Dialog.Actions>
              </Dialog>
            </Portal>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}> Players </Text>
            <View style={styles.sectionOptions}>
              {totalPlayersValues.map((totalPlayersValue, index) => (
                <Pressable
                  style={[
                    styles.optionButton,
                    index === totalPlayersIndex ? styles.optionButtonSelected : null,
                  ]}
                  key={index}
                  disabled={totalPlayersValue !== 2}
                  onPress={() => setTotalPlayersIndex(index)}>
                  <Text style={styles.optionText} selectable={false}>
                    {totalPlayersValue}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
          {/*          
          <View style={styles.section}>
            <View style={styles.checkboxContainer}>
              <Checkbox value={timer} onValueChange={setTimer} />
              <Text style={styles.checkboxLabel}>Timer</Text>
            </View>
          </View>*/}
          {/* <View style={styles.section}> */}
          <Checkbox.Item
            label="Save as preset"
            status={saveAsPreset ? "checked" : "unchecked"}
            onPress={() => setSaveAsPreset(!saveAsPreset)}
            position="leading"
            color={palette.primary[500]}
            labelStyle={styles.checkboxLabel}
          />
          {/* </View> */}
          {saveAsPreset && (
            <View style={styles.presetNameInput}>
              <TextInput
                placeholder="Preset Name"
                style={styles.textInput}
                value={presetName}
                onChangeText={setPresetName}
              />
            </View>
          )}
        </View>
        <Button text="Start Game" onPress={handleStartGamePress} style={styles.submitButton} />
      </View>
    </DefaultLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    backgroundColor: palette.grays[900],
    flex: 1,
    gap: 5,
    padding: 10,
  },
  settingsContainer: {
    width: "100%",
    flex: 1,
    gap: 5,
  },
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
  sectionOptions: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  optionButton: {
    backgroundColor: palette.grays[800],
    padding: 20,
    borderRadius: 5,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  optionButtonSelected: {
    backgroundColor: palette.grays[700],
  },
  optionText: {
    color: palette.neutrals.white,
    textAlign: "center",
  },
  submitButton: {
    width: "80%",
  },
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
  checkboxLabel: { textAlign: "left" },
  presetNameInput: {
    paddingHorizontal: 20,
  },
});
