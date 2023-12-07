import Checkbox from "expo-checkbox";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import uuid from "react-native-uuid";

import { updatePresets } from "../src/services/presetService";
import { Player } from "../src/types/types";

const startingLifeValues = [20, 30, 40, 100];
const defaultPlayers: Player[] = [{ backgroundColor: "#369" }, { backgroundColor: "#909" }];

export default function NewGame(): JSX.Element {
  const [startingLifeIndex, setStartingLifeIndex] = useState(0);
  const [saveAsPreset, setSaveAsPreset] = useState(false);
  const [presetName, setPresetName] = useState("");
  // const [players, setPlayers] = useState<Player[]>(defaultPlayers);

  const handleStartGamePress = async () => {
    const newPreset = {
      id: uuid.v4().toString(),
      name: presetName,
      startingLife: startingLifeValues[startingLifeIndex],
      players: defaultPlayers,
    };

    if (saveAsPreset) {
      await updatePresets(newPreset);
    }

    router.replace({ pathname: "/game", params: newPreset });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}> Starting Life </Text>
      <View style={styles.optionsContainer}>
        {startingLifeValues.map((startingLifeValue, index) => (
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
        ))}
      </View>

      <View style={styles.checkboxContainer}>
        <Checkbox value={saveAsPreset} onValueChange={setSaveAsPreset} />
        <Text style={styles.checkboxLabel}>Save as preset</Text>
      </View>
      {saveAsPreset && (
        <View>
          <TextInput
            placeholder="Preset Name"
            style={styles.textInput}
            value={presetName}
            onChangeText={setPresetName}
          />
        </View>
      )}
      <Pressable style={styles.submitButton} onPress={handleStartGamePress}>
        <Text style={styles.submitButtonText}>Start Game</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "#333",
    height: "100%",
    gap: 8,
    padding: 20,
  },
  label: {
    color: "#fff",
  },
  optionsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
  },
  optionButton: {
    backgroundColor: "#666",
    padding: 20,
    borderRadius: 5,
    flexGrow: 1,
  },
  optionButtonSelected: {
    backgroundColor: "#999",
  },
  optionText: {
    color: "#fff",
    textAlign: "center",
  },
  submitButton: {
    backgroundColor: "#369",
    padding: 20,
  },
  submitButtonText: {
    color: "#fff",
    textAlign: "center",
  },
  checkboxContainer: {
    paddingVertical: 20,
    paddingHorizontal: 0,
    gap: 10,
    flexDirection: "row",
  },
  checkboxLabel: {
    color: "#fff",
  },
  textInput: {
    backgroundColor: "#fff",
    padding: 10,
  },
});
