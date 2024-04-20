import { createSlice } from '@reduxjs/toolkit';

const GeneralIdSlice = createSlice({
  name: 'generalid',
  initialState: {
    value: '', // Initial state is an empty string
  },
  reducers: {
    setGeneralId: (state, action) => {
      state.value = action.payload; // Update the state with the provided string
    },
  },
});

export const { setGeneralId } = GeneralIdSlice.actions;

export const selectGeneralId = (state) => state.generalid.value;

export default GeneralIdSlice.reducer;
