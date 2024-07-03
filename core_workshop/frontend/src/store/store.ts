import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import commonReducer from "./slices/commonSlice";
import authReducer from "./slices/authSlice";

// let store: any = undefined;
const store = configureStore({
  reducer: { commonReducer, authReducer },
  devTools: true,
});

// export type of root state from reducers
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;
