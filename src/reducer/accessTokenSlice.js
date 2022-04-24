import { createSlice } from '@reduxjs/toolkit'

export const accessTokenSlice = createSlice({
    name: "accessToken",
    initialState: {
        value: "",
    },
    reducers: {
        setAccessToken: (state, action) => {
            state.value = action.payload;
        },
        removeAccessToken: (state) => {
            state.value = "";
            window.localStorage.clear();
        }
    }
});

export const { setAccessToken, removeAccessToken } = accessTokenSlice.actions;
export default accessTokenSlice.reducer;