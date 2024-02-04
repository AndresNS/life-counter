import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface CounterState {
  [payerId: number]: {
    lifeTotal: number;
  };
}

const initialState: CounterState = {
  1: {
    lifeTotal: NaN,
  },
  2: {
    lifeTotal: NaN,
  },
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state, action: PayloadAction<{ playerId: number; step: number }>) => {
      const { playerId, step } = action.payload;
      state[playerId].lifeTotal += step;
    },
    decrement: (state, action: PayloadAction<{ playerId: number; step: number }>) => {
      const { playerId, step } = action.payload;
      state[playerId].lifeTotal -= step;
    },
    set: (state, action: PayloadAction<{ playerId: number; value: number }>) => {
      const { playerId, value } = action.payload;
      state[playerId].lifeTotal = value;
    },
    reset: (state, action: PayloadAction<{ playerId: number; startingLife: number }>) => {
      const { playerId, startingLife } = action.payload;
      state[playerId].lifeTotal = startingLife;
    },
  },
});

export const { increment, decrement, set, reset } = counterSlice.actions;
export default counterSlice.reducer;
