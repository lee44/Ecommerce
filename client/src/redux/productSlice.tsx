import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Product } from "./typings/product";

export const fetchProducts = createAsyncThunk("fetch/products", async (url: string): Promise<Product[]> => {
	const response = await axios.get(url);
	const data = response.data;
	return data;
});

type ProductType = {
	result: Product[];
	status: "idle" | "pending" | "fulfilled" | "rejected";
};

const initialState: ProductType = {
	result: [],
	status: "idle",
};

const productSlice = createSlice({
	name: "products",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchProducts.pending, (state, action) => {
			state.status = "pending";
		});
		builder.addCase(fetchProducts.fulfilled, (state, { payload }) => {
			state.status = "fulfilled";
			state.result = payload;
		});
		builder.addCase(fetchProducts.rejected, (state, action) => {
			state.status = "rejected";
		});
	},
});

export default productSlice.reducer;
