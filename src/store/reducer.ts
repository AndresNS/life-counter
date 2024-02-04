import counterReducer from "@features/counter/counterSlice";
import presetsReducer from "@features/presets/presetSlice";
import { combineReducers } from "@reduxjs/toolkit";

const reducer = combineReducers({
  counter: counterReducer,
  presets: presetsReducer,
});

export default reducer;
