import { Product } from "@/types/product.type";
import { httpClient } from "@/utils/HttpClient";
import { server } from "@/utils/constants";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { act } from "react";
import { RootState } from "../store";

export interface StockState {
  stockAllResult: Product[];
  stockOneResult: Product | null;
}

const initialState: StockState = {
  stockAllResult: [],
  stockOneResult: null,
};

export const getProducts = createAsyncThunk("stock/getProducts", async () => {
  const result = await httpClient.get<Product[]>(server.PRODUCT_URL);
  return result.data;
});

// deleteProduct;
export const deleteProduct = createAsyncThunk(
  "stock/deleteProduct",
  async (id: string) => {}
);

const stockSlice = createSlice({
  name: "stock",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.stockAllResult = action.payload;
    });
  },
});
export const stockSelector = (state: RootState) => state.stockReducer;
export default stockSlice.reducer;
