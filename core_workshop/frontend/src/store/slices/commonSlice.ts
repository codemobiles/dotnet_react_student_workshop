import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type CommonState = {
  count: number;
};
const defaultState: CommonState = { count: 0 };

const addAsync = async (preCount: number) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return preCount + 1;
};

const commonSlice = createSlice({
  name: "common",
  reducers: {
    add: (state) => {
      state.count++;
    },
    del: (state) => {
      state.count--;
    },
  },
  extraReducers: (builder) => {},
  initialState: defaultState,
});

export const commonSelector = (state: RootState) => state.commonReducer;
export const { add, del } = commonSlice.actions;
export default commonSlice.reducer;
