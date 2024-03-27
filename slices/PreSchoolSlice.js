import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    preschool: [],
};

const PreSchoolSlice = createSlice({
    name: 'preschool',
    initialState,
    reducers: {
        addPreSchool(state, action) {
            state.preschool.unshift(action.payload);
        },
        setPreSchool(state, action) {
            state.preschool = action.payload.reverse();
        },
        deletepreSchool(state, action) {
            state.preschool = state.preschool.filter((expense) => expense.id !== action.payload);
        },
        updatePreSchool(state, action) {
            const updateCaseIndex = state.preschool.findIndex(
                (expense) => expense.id === action.payload.id
            );
            const updatedItem = { ...state.preschool[updateCaseIndex], ...action.payload.data };
            state.preschool[updateCaseIndex] = updatedItem;
        },
    },
});

export const { addPreSchool,setPreSchool,deletepreSchool,updatePreSchool } = PreSchoolSlice.actions;
export const selectPreSchool = (state) => state.preschool.preschool;
export const selectCaseById = (state,id) => state.preschool.preschool.filter(preschool=> preschool.id == id);

export default PreSchoolSlice.reducer;
