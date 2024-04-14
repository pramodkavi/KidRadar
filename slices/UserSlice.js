import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userId: null,
    isAuthenticated: false,
};

const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.userId = action.payload;
            state.isAuthenticated = true;
        },
        clearUser: (state) => {
            state.userId = null;
            state.isAuthenticated = false;
        },
    },
});

export const { setUser, clearUser } = UserSlice.actions;

export default UserSlice.reducer;
