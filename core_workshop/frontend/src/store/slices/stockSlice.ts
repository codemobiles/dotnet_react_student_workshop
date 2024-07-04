import { Product } from "@/types/product.type";
import { httpClient } from "@/utils/HttpClient";
import { server } from "@/utils/constants";
import { createSlice } from "@reduxjs/toolkit";

export interface StockState {
  stockAllResult: Product[];
  stockOneResult: Product | null;
}

const initialState: StockState = {
  stockAllResult: [],
  stockOneResult: null,
};

const getProducts = async () => {
  const result = await httpClient.get<Product[]>(server.PRODUCT_URL);
  return result.data;
};

const stockSlice = createSlice({
  name: "stock",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default stockSlice.reducer;
