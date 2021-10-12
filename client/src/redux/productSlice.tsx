import { createSlice } from "@reduxjs/toolkit";
import type { Product } from "./api";
import { fetchProducts } from "./api";

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
