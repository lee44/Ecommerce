import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk("fetch/products", async (url: string) => {
	const response = await axios.get(url);
	const data = response.data;
	console.log(data);

	return data;
});
