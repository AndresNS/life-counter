import Button from "@common/components/Button";
import DefaultLayout from "@common/layouts/Default";
import palette from "@constants/colors";
import { Player } from "@constants/types";
import { FontAwesome } from "@expo/vector-icons";
import CustomLifeForm from "@features/new-game/CustomLifeForm";
import DynamicPreview from "@features/new-game/counter-preview/DynamicPreview";
import { useGameContext } from "@features/new-game/gameContext";
import { usePresetsContext } from "@features/presets/presetsContext";
import { Preset } from "@features/presets/types";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Checkbox } from "react-native-paper";
import uuid from "react-native-uuid";

const startingLifeValues = [20, 40, 100];
const totalPlayersValues = [2, 3, 4];

export default function NewGame(): JSX.Element {
  const { game, newGame, updatePlayers } = useGameContext();
  const { addPreset } = usePresetsContext();
  const [startingLifeIndex, setStartingLifeIndex] = useState(0);
  const [totalPlayersIndex, setTotalPlayersIndex] = useState(0);
  const [startingLife, setStartingLife] = useState("");
  // const [timer, setTimer] = useState(false);
  const [saveAsPreset, setSaveAsPreset] = useState(false);
  const [presetName, setPresetName] = useState("");

  const [customLifeDialogVisible, setCustomLifeDialogVisible] = useState(false);

  useEffect(() => {
    const newPlayers = [{}, {}].map(
      (_, index): Player => ({
        playerId: (index + 1).toString(),
        backgroundColor: palette.customs[(index + 1).toString() as keyof typeof palette.customs],
        backgroundTheme: "default",
        startingLife: 20,
        lifeTotal: 20,
      }),
    );

    newGame({
      players: newPlayers,
    });
  }, []);

  useEffect(() => {
    const newPlayers = new Array(totalPlayersValues[totalPlayersIndex]).fill({});

    updatePlayers(
      newPlayers.map(
        (player, index): Player =>
          player.playerId
            ? player
            : {
                playerId: (index + 1).toString(),
                backgroundColor:
                  palette.customs[(index + 1).toString() as keyof typeof palette.customs],
                backgroundTheme: "default",
                startingLife: Number(startingLife),
                lifeTotal: Number(startingLife),
              },
      ),
    );
  }, [totalPlayersIndex]);

  useEffect(() => {
    if (startingLife !== "")
      updatePlayers(
        game.players.map(
          (player): Player => ({
            ...player,
            startingLife: Number(startingLife),
            lifeTotal: Number(startingLife),
          }),
        ),
      );
  }, [startingLife]);

  useEffect(() => {
    if (startingLifeIndex !== startingLifeValues.length)
      setStartingLife(startingLifeValues[startingLifeIndex].toString());
  }, [startingLifeIndex]);

  const handleStartGamePress = async () => {
    const newPreset: Preset = {
      id: uuid.v4(),
      name: presetName,
      players: game.players,
    };

    if (saveAsPreset) addPreset(newPreset);

    router.replace({
      pathname: "/game",
    });
  };

  const handleCustomStartingLife = () => {
    setStartingLifeIndex(startingLifeValues.length);

    setCustomLifeDialogVisible(true);
  };

  return (
    <DefaultLayout title="New Game">
      <View style={styles.container}>
        <View style={styles.settingsContainer}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Players</Text>
            <View style={styles.sectionOptions}>
              {totalPlayersValues.map((totalPlayersValue, index) => (
                <Pressable
                  style={[
                    styles.optionButton,
                    index === totalPlayersIndex ? styles.optionButtonSelected : null,
                  ]}
                  key={index}
                  onPress={() => setTotalPlayersIndex(index)}>
                  <Text style={styles.optionText} selectable={false}>
                    {totalPlayersValue}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Starting Life</Text>
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
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Customization</Text>
            <DynamicPreview players={game.players} />
          </View>
          {/*          
          <View style={styles.section}>
            <View style={styles.checkboxContainer}>
              <Checkbox value={timer} onValueChange={setTimer} />
              <Text style={styles.checkboxLabel}>Timer</Text>
            </View>
          </View>*/}
          <Checkbox.Item
            label="Save as preset"
            status={saveAsPreset ? "checked" : "unchecked"}
            onPress={() => setSaveAsPreset(!saveAsPreset)}
            position="leading"
            color={palette.primary[500]}
            labelStyle={styles.checkboxLabel}
          />
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
        <CustomLifeForm
          customLife={startingLife}
          setCustomLife={setStartingLife}
          visible={customLifeDialogVisible}
          setVisible={setCustomLifeDialogVisible}
        />
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
  checkboxLabel: { color: palette.neutrals.white, textAlign: "left" },
  presetNameInput: {
    paddingHorizontal: 20,
  },
});
