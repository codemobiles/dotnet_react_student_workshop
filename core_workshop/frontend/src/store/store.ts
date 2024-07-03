import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

// let store: any = undefined;
const store = configureStore({
  reducer: {},
  devTools: true,
});

// export type of root state from reducers
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;
