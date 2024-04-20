import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    institutes: [],
};

const InstituteSlice = createSlice({
    name: 'institutes',
    initialState,
    reducers: {
        addInstitute(state, action) {
            state.institutes.unshift(action.payload);
        },
        setInstitute(state, action) {
            state.institutes = action.payload.reverse();
        },
        deleteInstitute(state, action) {
            state.institutes = state.institutes.filter((expense) => expense.id !== action.payload);
        },
        updateInstitute(state, action) {
            const updateCaseIndex = state.institutes.findIndex(
                (expense) => expense.id === action.payload.id
            );
            const updatedItem = { ...state.institutes[updateCaseIndex], ...action.payload.data };
            state.institutes[updateCaseIndex] = updatedItem;
        },
    },
});

export const { addInstitute, setInstitute, deleteInstitute, updateInstitute } = InstituteSlice.actions;
export const selectInstitute = (state) => state.institutes.institutes;
export const selectCaseById = (state,id) => state.institutes.institutes.filter(Institute=> Institute.id == id);

export default InstituteSlice.reducer;
