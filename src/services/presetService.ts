import storage from "../lib/storage";
import { Preset } from "../types/types";

const fetchPresets = async (): Promise<Preset[]> => {
  const presets = await storage.fetch<Preset[]>("presets");

  if (presets !== null) return presets;
  return [];
};

const updatePresets = async (preset: Preset): Promise<void> => {
  const presets = await fetchPresets();
  const updatedPresets = [...presets, preset];
  await storage.save("presets", updatedPresets);
};

export { fetchPresets, updatePresets };
