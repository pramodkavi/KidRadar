import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cases: [],
};

const caseSlice = createSlice({
    name: 'cases',
    initialState,
    reducers: {
        addCase(state, action) {
            state.cases.unshift(action.payload);
        },
        setCase(state, action) {
            state.cases = action.payload.reverse();
        },
        deleteCase(state, action) {
            state.cases = state.cases.filter((expense) => expense.id !== action.payload);
        },
        updateCase(state, action) {
            const updateCaseIndex = state.cases.findIndex(
                (expense) => expense.id === action.payload.id
            );
            const updatedItem = { ...state.cases[updateCaseIndex], ...action.payload.data };
            state.cases[updateCaseIndex] = updatedItem;
        },
    },
});

export const { addCase, setCase, deleteCase, updateCase } = caseSlice.actions;
export const selectCase = (state) => state.cases.cases;
export const selectCaseById = (state,id) => state.cases.cases.filter(cases=> cases.id == id);

export default caseSlice.reducer;
