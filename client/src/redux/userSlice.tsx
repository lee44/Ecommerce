import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ENDPOINTS } from "../config/Endpoints/endpoints";
import { FormInput } from "../pages/Login/Login";

export const fetchTokens = createAsyncThunk("fetch/token", async (formData: FormInput) => {
	const response = await axios.post(ENDPOINTS.LOGIN, formData);
	return response.data;
});

export const fetchAccessToken = createAsyncThunk("fetch/accessToken", async () => {
	const response = await axios.get(ENDPOINTS.ACCESSTOKEN, { withCredentials: true });
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
	reducers: {
		deleteToken(state,action) => {
			
		}
	},
	extraReducers(builder) {
		builder.addCase(fetchTokens.pending, (state, action) => {
			state.status = "loading";
		});
		builder.addCase(fetchTokens.fulfilled, (state, action) => {
			state.status = "succeeded";
			state.username = action.payload.username;
			state.token = action.payload.access_token;
		});
		builder.addCase(fetchTokens.rejected, (state, action) => {
			state.status = "failed";
		});
	},
});

export default userSlice.reducer;
