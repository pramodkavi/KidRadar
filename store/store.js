import { configureStore } from '@reduxjs/toolkit'
import caseSlice from "../slices/CaseSlice";
import PreSchoolCasesSlice from "../slices/PreSchoolCasesSlice";
import PreSchoolCasesCountSlice from "../slices/PreSchoolCasesCountSlice";
import PreSchoolSlice from "../slices/PreSchoolSlice";
import SchoolSlice from "../slices/SchoolSlice";
import UserReducer from '../slices/UserSlice';
import InstituteSlice from '../slices/InstituteSlice';
import CourseSlice from '../slices/CourseSlice';



export const store = configureStore({
    reducer: {
        cases: caseSlice,
        preSchoolCases:PreSchoolCasesSlice,
        preSchoolCasesCount:PreSchoolCasesCountSlice,
        preschool:PreSchoolSlice,
        schools:SchoolSlice,
        user:UserReducer,
        institutes:InstituteSlice,
        courses:CourseSlice
    },
})