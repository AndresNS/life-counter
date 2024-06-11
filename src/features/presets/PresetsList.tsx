import palette from "@constants/colors";
import { FlatList, View, Text, StyleSheet } from "react-native";

import PresetListItem from "./PresetsListItem";
import { Preset } from "./types";

type PresetListsProps = {
  presets: Preset[];
};

export default function PresetList({ presets }: PresetListsProps): JSX.Element {
  return (
    <>
      {presets.length === 0 ? (
        <View
          style={{
            padding: 20,
            flex: 1,
          }}>
          <Text selectable={false} style={styles.text}>
            You don’t have any presets saved.
          </Text>
          <Text selectable={false} style={styles.text}>
            You can create one by starting a new game.
          </Text>
        </View>
      ) : (
        <FlatList
          data={presets}
          renderItem={({ item }) => <PresetListItem preset={item} />}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  text: { fontSize: 16, color: palette.neutrals.white, textAlign: "center" },
});
