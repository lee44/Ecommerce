import { createSlice } from "@reduxjs/toolkit";
import type { Product } from "./api";
import { fetchProducts } from "./api";
import { RootState } from "./store";

type ProductType = {
	result: Product[];
	status: "idle" | "pending" | "fulfilled" | "rejected";
};

export type FilterType = {
	amd: boolean;
	intel: boolean;
	price: {
		firstChoice: boolean;
		secondChoice: boolean;
		thirdChoice: boolean;
		fourthChoice: boolean;
		fifthChoice: boolean;
	};
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

export const filterProducts = (state: RootState, filterState: FilterType) => {
	const filterAMD = (product: Product) => {
		return filterState.amd ? true : product.manufacturer !== "AMD";
	};
	const filterIntel = (product: Product) => {
		return filterState.intel ? true : product.manufacturer !== "Intel";
	};
	const filterPrice = (product: Product) => {
		return filterState.price ? true : product.manufacturer !== "Intel";
	};

	return state.products.result.filter(filterAMD).filter(filterIntel);
};

export default productSlice.reducer;
