import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchProducts } from "./api";
import type { Product } from "./api";

type productState = {
	result: Product[];
	status: "idle" | "pending" | "fulfilled" | "rejected";
};

const initialState: productState = {
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
