import palette from "@constants/colors";
import { AppDispatch, RootState } from "@store/configureStore";
import { useEffect, useState } from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import PresetListItem from "./PresetsListItem";
import { getPresets } from "./presetSlice";

export default function PresetList(): JSX.Element {
  const presets = useSelector((state: RootState) => state.presets.presets);
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPresets = async () => {
      await dispatch(getPresets());
      setLoading(false);
    };

    fetchPresets();
  }, []);

  return (
    <>
      {(loading && (
        <View>
          <Text selectable={false} style={{ color: palette.neutrals.white }}>
            Loading Presets...
          </Text>
        </View>
      )) ||
        (presets.length === 0 ? (
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
            renderItem={({ item }) => (
              <PresetListItem
                id={item.id}
                name={item.name}
                startingLife={item.startingLife}
                players={item.players}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        ))}
    </>
  );
}

const styles = StyleSheet.create({
  text: { fontSize: 16, color: palette.neutrals.white, textAlign: "center" },
});
