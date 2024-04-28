import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    users: [],
};

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addUser(state, action) {
            state.users.unshift(action.payload);
        },
        setUser(state, action) {
            state.users = action.payload.reverse();
        },
        deleteUser(state, action) {
            state.users = state.users.filter(user => user.email !== action.payload);
        },
        updateUser(state, action) {
            const updateUserIndex = state.users.findIndex(user => user.email === action.payload.email);
            state.users[updateUserIndex] = action.payload.data;
        },
    },
});

export const { addUser, deleteUser, updateUser, setUser } = userSlice.actions;
export const selectUsers = state => state.users.users;
export const selectUserByEmail = (state, email) => state.users.users.find(user => user.email === email);

export default userSlice.reducer;
