import storage from "@common/lib/storage";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";

import { Preset } from "./types";

type PresetsState = {
  presets: Preset[];
  addPreset: (preset: Preset) => Promise<void>;
  editPreset: (updatedPreset: Preset) => Promise<void>;
  getPreset: (presetId: string | number[]) => Preset;
  deletePreset: (presetId: string | number[]) => Promise<void>;
};

const defaultState: PresetsState = {
  presets: [],
  addPreset: async () => {},
  editPreset: async () => {},
  getPreset: () => ({ id: "", name: "", players: [] }),
  deletePreset: async () => {},
};

export const PresetsContext = createContext<PresetsState>(defaultState);

export const PresetsContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [presets, setPresets] = useState<Preset[]>([]);

  useEffect(() => {
    async function loadPresets() {
      const presets = await storage.fetch<Preset[]>("presets");

      if (presets === null) return [];
      setPresets(presets);
    }

    loadPresets();
  }, []);

  const addPreset = async (preset: Preset) => {
    const presets = await storage.fetch<Preset[]>("presets");
    const updatedPresets = [...(presets || []), preset];
    await storage.save("presets", updatedPresets);

    setPresets(updatedPresets);
  };

  const editPreset = async (updatedPreset: Preset) => {
    const presets = await storage.fetch<Preset[]>("presets");
    const updatedPresets = presets?.map((preset) =>
      preset.id === updatedPreset.id ? updatedPreset : preset,
    );

    await storage.save("presets", updatedPresets);

    setPresets(updatedPresets || []);
  };

  const getPreset = (presetId: string | number[]) => {
    const preset = presets.find((preset) => preset.id === presetId);

    if (!preset) throw new Error(`Preset with id:${presetId} not found`);

    return preset;
  };

  const deletePreset = async (presetId: string | number[]) => {
    const presets = await storage.fetch<Preset[]>("presets");
    const updatedPresets = presets?.filter((preset) => preset.id !== presetId);
    await storage.save("presets", updatedPresets);

    setPresets(updatedPresets || []);
  };

  return (
    <PresetsContext.Provider value={{ presets, addPreset, editPreset, getPreset, deletePreset }}>
      {children}
    </PresetsContext.Provider>
  );
};

export const usePresetsContext = () => useContext(PresetsContext);
