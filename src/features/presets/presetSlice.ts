import storage from "@common/lib/storage";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { Player } from "./types";

export interface Preset {
  id: string | number[];
  name: string;
  startingLife: number;
  players: Player[];
}

interface PresetState {
  presets: Preset[];
}

const initialState: PresetState = {
  presets: [],
};

const presetSlice = createSlice({
  name: "preset",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPresets.pending, () => {
        console.log("getPresets Pending");
      })
      .addCase(getPresets.fulfilled, (state, action: PayloadAction<Preset[]>) => {
        state.presets = action.payload;
        console.log("getPresets fulfilled");
      })
      .addCase(getPresets.rejected, () => {
        console.log("getPressets rejected");
      })
      .addCase(createPreset.pending, () => {
        console.log("create Preset pending");
      })
      .addCase(createPreset.fulfilled, (state, action: PayloadAction<Preset>) => {
        state.presets = [...state.presets, action.payload];
        console.log("create Preset fulfilled");
      })
      .addCase(createPreset.rejected, () => {
        console.log("create Preset rejected");
      })
      .addCase(editPreset.pending, () => {
        console.log("edit Preset pending");
      })
      .addCase(editPreset.fulfilled, (state, action: PayloadAction<Preset[] | null>) => {
        if (action.payload !== null) state.presets = action.payload;
        console.log("edit Preset fulfilled");
      })
      .addCase(editPreset.rejected, () => {
        console.log("edit Preset rejected");
      })
      .addCase(deletePreset.pending, () => {
        console.log("delete Preset pending");
      })
      .addCase(deletePreset.fulfilled, (state, action: PayloadAction<string | number[] | null>) => {
        state.presets = state.presets.filter((preset) => preset.id !== action.payload);
        console.log("delete Preset fulfilled");
      })
      .addCase(deletePreset.rejected, () => {
        console.log("delete Preset rejected");
      });
  },
});

export const getPresets = createAsyncThunk("presets/getPresets", async () => {
  const presets = await storage.fetch<Preset[]>("presets");

  if (presets !== null) return presets;
  return [];
});

export const createPreset = createAsyncThunk("presets/createPreset", async (preset: Preset) => {
  const presets = await storage.fetch<Preset[]>("presets");
  const updatedPresets = [...(presets || []), preset];
  await storage.save("presets", updatedPresets);

  return preset;
});

export const editPreset = createAsyncThunk("presets/editPreset", async (updatedPreset: Preset) => {
  const presets = await storage.fetch<Preset[]>("presets");

  if (presets === null) return null;
  const updatedPresets = presets.map((preset) =>
    preset.id === updatedPreset.id ? updatedPreset : preset,
  );

  await storage.save("presets", updatedPresets);

  return updatedPresets;
});

export const deletePreset = createAsyncThunk(
  "presets/deletePresets",
  async (id: string | number[]) => {
    const presets = await storage.fetch<Preset[]>("presets");

    if (presets === null) return null;

    const updatedPresets = presets.filter((preset) => preset.id !== id);
    await storage.save("presets", updatedPresets);

    return id;
  },
);

export default presetSlice.reducer;
