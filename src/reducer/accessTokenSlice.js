import { createSlice } from '@reduxjs/toolkit'

export const accessTokenSlice = createSlice({
    name: "accessToken",
    initialState: {
        value: "",
        type: "",
    },
    reducers: {
        setAccessToken: (state, action) => {
            state.value = action.payload;
        },
        setTokenType: (state, action) => {
            state.type = action.payload;
        },
        removeAccessToken: (state) => {
            state.value = "";
            state.type = "";
            window.localStorage.clear();
        }
    }
});

export const { setAccessToken, setTokenType, removeAccessToken } = accessTokenSlice.actions;
export default accessTokenSlice.reducer;