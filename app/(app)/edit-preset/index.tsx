import Button from "@common/components/Button";
import DefaultLayout from "@common/layouts/Default";
import { isUniformArray } from "@common/lib/helpers";
import palette from "@constants/colors";
import { Player } from "@constants/types";
import { FontAwesome } from "@expo/vector-icons";
import DynamicPreview from "@features/counter-preview/DynamicPreview";
import CustomLifeForm from "@features/new-game/CustomLifeForm";
import { Game, useGameContext } from "@features/new-game/gameContext";
import { usePresetsContext } from "@features/presets/presetsContext";
import { Preset } from "@features/presets/types";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

const startingLifeValues = [20, 40, 100];
const totalPlayersValues = [2, 3, 4];

const gameHasAsymmetricStartingLife = (game: Game) => {
  const playersStartingLifes = game.players.map((player: Player) => player.startingLife);

  return !isUniformArray(playersStartingLifes);
};

const getInitialStartingLifeIndex = (game: Game) => {
  const playersStartingLifes = game.players.map((player: Player) => player.startingLife);

  // Asymmetric starting life
  if (!isUniformArray(playersStartingLifes)) return startingLifeValues.length + 1;

  // Default starting life
  if (startingLifeValues.includes(playersStartingLifes[0]))
    return startingLifeValues.indexOf(playersStartingLifes[0]);

  // Custom starting life
  return startingLifeValues.length;
};

const getInitialStartingLife = (startingLifeIndex: number) => {
  if (startingLifeIndex < startingLifeValues.length)
    return startingLifeValues[startingLifeIndex].toString();
  return "";
};

export default function EditPreset(): JSX.Element {
  const { game, clearGame, updatePlayers } = useGameContext();
  const { editPreset } = usePresetsContext();

  const params = useLocalSearchParams();
  const { preset: presetParams } = params;
  const initialPresetState: Preset = JSON.parse(presetParams as string);

  const [startingLifeIndex, setStartingLifeIndex] = useState(getInitialStartingLifeIndex(game));
  const [totalPlayersIndex, setTotalPlayersIndex] = useState(
    totalPlayersValues.indexOf(game.players.length),
  );

  const [startingLife, setStartingLife] = useState(getInitialStartingLife(startingLifeIndex));
  const [preset, setPreset] = useState<Preset>(initialPresetState);

  const [customLifeDialogVisible, setCustomLifeDialogVisible] = useState(false);

  useEffect(() => {
    return () => {
      clearGame();
    };
  }, []);

  useEffect(() => {
    if (startingLife === "" && !gameHasAsymmetricStartingLife(game)) return;

    const newPlayers = new Array(totalPlayersValues[totalPlayersIndex]).fill({});

    const updatedPlayers = newPlayers.map(
      (_, index): Player =>
        game.players[index]?.playerId
          ? game.players[index]
          : {
              playerId: (index + 1).toString(),
              backgroundColor:
                palette.customs[(index + 1).toString() as keyof typeof palette.customs],
              backgroundTheme: "default",
              startingLife:
                initialPresetState.players[index] && startingLifeIndex > startingLifeValues.length
                  ? initialPresetState.players[index].startingLife
                  : Number(startingLife),
              lifeTotal:
                initialPresetState.players[index] && startingLifeIndex > startingLifeValues.length
                  ? initialPresetState.players[index].startingLife
                  : Number(startingLife),
            },
    );

    updatePlayers(updatedPlayers);
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
    if (startingLifeIndex < startingLifeValues.length)
      setStartingLife(startingLifeValues[startingLifeIndex].toString());
  }, [startingLifeIndex]);

  const handleSaveChangesPress = async () => {
    await editPreset({
      id: initialPresetState.id,
      name: initialPresetState.name,
      players: game.players,
    });

    router.back();
  };

  const handleDiscardChangesPress = async () => {
    clearGame();
    router.back();
  };

  const handleCustomStartingLife = () => {
    setStartingLifeIndex(startingLifeValues.length);

    setCustomLifeDialogVisible(true);
  };

  return (
    <DefaultLayout title="Edit Preset">
      <View style={styles.container}>
        <View style={styles.settingsContainer}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Preset Name</Text>
            <TextInput
              placeholder="Preset Name"
              style={styles.textInput}
              value={preset.name}
              onChangeText={(value) => setPreset((prev) => ({ ...prev, name: value }))}
            />
          </View>
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
        </View>
        <View style={styles.buttonsContainer}>
          <Button
            text="Discard Changes"
            onPress={handleDiscardChangesPress}
            style={[
              styles.actionButton,
              {
                backgroundColor: palette.grays[900],
                borderColor: palette.grays[500],
                borderWidth: 1,
              },
            ]}
          />
          <Button
            text="Save Changes"
            onPress={handleSaveChangesPress}
            style={styles.actionButton}
          />
        </View>
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
  buttonsContainer: { width: "100%", flexDirection: "row", gap: 10 },
  actionButton: {
    flex: 1,
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
});
