import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../../config/service";


const INITIAL_STATE = {
    isLoading: false,
}

const AuthSlice = createSlice({
    initialState: INITIAL_STATE,
    name: 'auth',
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(LogIn.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(LogIn.fulfilled, (state, action) => {
            state.isLoading = false
        })
        builder.addCase(LogIn.rejected, (state, action) => {
            state.isLoading = false
        })
    }
})

export default AuthSlice.reducer


// login

export const LogIn = createAsyncThunk('/auth/POST', async (payload, { rejectWithValue }) => {
    try {
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
        const response = await axios.post(`${BASE_URL}/login`, payload, headers);
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data.message || 'Invalid Credentials')
    }   
})