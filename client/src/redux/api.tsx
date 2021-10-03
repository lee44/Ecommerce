import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export type Product = {
	_id: string;
	name: string;
	cores: number;
	base_clock: number;
	boost_clock: number;
	l3_cache: number;
	tdp: number;
	price: number;
	discount: number;
	integrated_graphics: string;
	reviews: number;
	stars: number;
	release_date: Date;
	best_sellers: [{ seller: string; price: number; ratings: number; pos_review_percent: number }];
	image: [string];
	details: [string];
};

export const fetchProducts = createAsyncThunk("fetch/products", async (url: string): Promise<Product[]> => {
	const response = await axios.get(url);
	const data = response.data;
	return data;
});
