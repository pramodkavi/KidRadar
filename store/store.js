import { configureStore } from '@reduxjs/toolkit'
import caseSlice from "../slices/CaseSlice";
import PreSchoolCasesSlice from "../slices/PreSchoolCasesSlice";
import PreSchoolCasesCountSlice from "../slices/PreSchoolCasesCountSlice";
import PreSchoolSlice from "../slices/PreSchoolSlice";



export const store = configureStore({
    reducer: {
        cases: caseSlice,
        preSchoolCases:PreSchoolCasesSlice,
        preSchoolCasesCount:PreSchoolCasesCountSlice,
        preschool:PreSchoolSlice,
    },
})