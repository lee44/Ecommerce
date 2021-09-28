import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchProducts } from "./api";
import { RootState } from "./store";

export const productSlice = createSlice({
	name: "product",
	initialState: {},
	reducers: {},
	extraReducers(builder) {},
});
