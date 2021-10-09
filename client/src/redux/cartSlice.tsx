import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

type cartState = {
	items: { [id: string]: number };
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
