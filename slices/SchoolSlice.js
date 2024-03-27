import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    schools: [],
};

const SchoolSlice = createSlice({
    name: 'schools',
    initialState,
    reducers: {
        addSchool(state, action) {
            state.schools.unshift(action.payload);
        },
        setSchools(state, action) {
            state.schools = action.payload.reverse();
        },
        deleteSchool(state, action) {
            state.schools = state.schools.filter((expense) => expense.id !== action.payload);
        },
        updateSchool(state, action) {
            const updateCaseIndex = state.schools.findIndex(
                (expense) => expense.id === action.payload.id
            );
            const updatedItem = { ...state.schools[updateCaseIndex], ...action.payload.data };
            state.schools[updateCaseIndex] = updatedItem;
        },
    },
});

export const { addSchool,setSchools,deleteSchool,updateSchool } = SchoolSlice.actions;
export const selectSchool = (state) => state.schools.schools;
export const selectCaseById = (state,id) => state.schools.schools.filter(school=> school.id == id);

export default SchoolSlice.reducer;
