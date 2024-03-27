import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    preSchoolCasesCount: [],
};

const PreSchoolCasesCountSlice = createSlice({
    name: 'preSchoolCasesCount',
    initialState,
    reducers: {
        addPreSchoolCasesCount(state, action) {
            state.preSchoolCasesCount.unshift(action.payload);
        },
        setPreSchoolCasesCount(state, action) {
            state.preSchoolCasesCount = action.payload.reverse();
        },
        deletePreSchoolCasesCount(state, action) {
            state.preSchoolCasesCount = state.preSchoolCasesCount.filter((expense) => expense.id !== action.payload);
        },
        updatePreSchoolCasesCount(state, action) {
            const updateCaseIndex = state.preSchoolCasesCount.findIndex(
                (expense) => expense.id === action.payload.id
            );
            const updatedItem = { ...state.preSchoolCasesCount[updateCaseIndex], ...action.payload.data };
            state.preSchoolCasesCount[updateCaseIndex] = updatedItem;
        },
    },
});

export const { addPreSchoolCasesCount, setPreSchoolCasesCount, deletePreSchoolCasesCount, updatePreSchoolCasesCount } = PreSchoolCasesCountSlice.actions;
export const selectPreSchoolCasesCount = (state) => state.preSchoolCasesCount.preSchoolCasesCount;
export const selectPreSchoolCasesCountById = (state,id) => state.preSchoolCasesCount.preSchoolCasesCount.filter(preSchoolCasesCount=> preSchoolCasesCount.id == id);

export default PreSchoolCasesCountSlice.reducer;
