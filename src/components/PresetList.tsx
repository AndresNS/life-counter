import { useEffect, useState } from "react";
import { FlatList } from "react-native";

import PresetListItem from "./PresetListItem";
import { fetchPresets } from "../services/presetService";
import { Preset } from "../types/types";

export default function PresetList(): JSX.Element {
  const [presetsList, setPresetsList] = useState<Preset[]>([]);

  useEffect(() => {
    const loadPresets = async () => {
      const presets = await fetchPresets();

      setPresetsList(presets);
    };

    loadPresets();
  }, []);

  return (
    <FlatList
      data={presetsList}
      renderItem={({ item }) => (
        <PresetListItem name={item.name} startingLife={item.startingLife} players={item.players} />
      )}
      keyExtractor={(item) => item.id}
    />
  );
}
