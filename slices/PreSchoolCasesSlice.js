import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    preSchoolCases: [],
};

const PreSchoolCasesSlice = createSlice({
    name: 'preSchoolCases',
    initialState,
    reducers: {
        addPreSchoolCase(state, action) {
            state.preSchoolCases.unshift(action.payload);
        },
        setPreSchoolCase(state, action) {
            state.preSchoolCases = action.payload.reverse();
        },
        deletePreSchoolCase(state, action) {
            state.preSchoolCases = state.preSchoolCases.filter((expense) => expense.id !== action.payload);
        },
        updatePreSchoolCase(state, action) {
            const updateCaseIndex = state.preSchoolCases.findIndex(
                (expense) => expense.id === action.payload.id
            );
            const updatedItem = { ...state.preSchoolCases[updateCaseIndex], ...action.payload.data };
            state.preSchoolCases[updateCaseIndex] = updatedItem;
        },
    },
});

export const { addPreSchoolCase, setPreSchoolCase, deletePreSchoolCase, updatePreSchoolCase } = PreSchoolCasesSlice.actions;
export const selectPreSchoolCase = (state) => state.preSchoolCases.preSchoolCases;
export const selectPreSchoolCaseById = (state,id) => state.preSchoolCases.preSchoolCases.filter(preSchoolCases=> preSchoolCases.id == id);

export default PreSchoolCasesSlice.reducer;
