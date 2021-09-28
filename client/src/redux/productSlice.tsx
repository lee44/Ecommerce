import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchProducts } from "./api";
import type { Product } from "./api";

type productState = {
	result: Product[];
	loading: "idle" | "pending" | "fulfilled" | "rejected";
};

const initialState: productState = {
	result: [],
	loading: "idle",
};

const productSlice = createSlice({
	name: "products",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchProducts.pending, (state, action) => {
			state.loading = "pending";
		});
		builder.addCase(fetchProducts.fulfilled, (state, { payload }) => {
			state.loading = "fulfilled";
			state.result = payload;
		});
		builder.addCase(fetchProducts.rejected, (state, action) => {
			state.loading = "rejected";
		});
	},
});

export default productSlice.reducer;
