import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosRequestConfig } from "axios";
import { ENDPOINTS } from "../config/Endpoints/endpoints";
import { FormInput } from "../pages/Login/Login";

const config: AxiosRequestConfig = {
	headers: { "Content-Type": "application/json" },
	withCredentials: true,
};

export const fetchJWTToken = createAsyncThunk("fetch/JWTtoken", async (formData: FormInput) => {
	const response = await axios.post(ENDPOINTS.LOGIN, formData, config);

	return response.data;
});

const initialState = {
	username: "",
	token: "",
	status: "idle",
	error: null,
};

const userSlice = createSlice({
	name: "user",
	initialState: initialState,
	reducers: {},
	extraReducers(builder) {
		builder.addCase(fetchJWTToken.pending, (state, action) => {
			state.status = "loading";
		});
		builder.addCase(fetchJWTToken.fulfilled, (state, action) => {
			state.status = "succeeded";
			state.username = action.payload.username;
			state.token = action.payload.token;
		});
		builder.addCase(fetchJWTToken.rejected, (state, action) => {
			state.status = "failed";
		});
	},
});

export default userSlice.reducer;
