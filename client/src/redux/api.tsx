import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export type Product = {
	name: string;
	cores: number;
	base_clock: number;
	boost_clock: number;
	l3_cache: number;
	tdp: number;
	condition: string;
	price: number;
	integrated_graphics: string;
	reviews: number;
	stars: number;
	release_date: Date;
	image: string;
};

export const fetchProducts = createAsyncThunk("fetch/products", async (url: string): Promise<Product[]> => {
	const response = await axios.get(url);
	const data = response.data;
	return data;
});
