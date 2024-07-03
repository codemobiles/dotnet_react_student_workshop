import { createSlice } from "@reduxjs/toolkit";

export type CommonState = {
  count: number;
};
const defaultState: CommonState = { count: 0 };

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
  initialState: defaultState,
});

export default commonSlice.reducer;
