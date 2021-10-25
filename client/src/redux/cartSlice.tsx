import { createAsyncThunk, createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "./store";
import { Product } from "./typings/product";

export const fetchProduct = createAsyncThunk("fetch/product", async (url: string): Promise<Product[]> => {
	const response = await axios.get(url);
	const data = response.data;
	return data;
});

type cartState = {
	items: { [id: string]: number };
	product?: Product;
	status: "idle" | "pending" | "fulfilled" | "rejected";
};

const initialState: cartState = {
	items: {},
	status: "idle",
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addToCart(state, action: PayloadAction<string>) {
			const id = action.payload;
			if (state.items[id]) {
				state.items[id]++;
			} else {
				state.items[id] = 1;
			}
		},
	},
});

export const getMemoizedNumItems = createSelector(
	(state: RootState) => state.cart.items,
	(items) => {
		let numItems = 0;
		for (let id in items) {
			numItems += items[id];
		}
		return numItems;
	}
);

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
