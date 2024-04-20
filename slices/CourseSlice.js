import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    courses: [],
};

const CourseSlice = createSlice({
    name: 'courses',
    initialState,
    reducers: {
        addCourse(state, action) {
            state.courses.unshift(action.payload);
        },
        setCourses(state, action) {
            state.courses = action.payload.reverse();
        },
        deleteCourse(state, action) {
            state.courses = state.courses.filter((course) => course.id !== action.payload);
        },
        updateCourse(state, action) {
            const updateCourseIndex = state.courses.findIndex(
                (course) => course.id === action.payload.id
            );
            const updatedItem = { ...state.courses[updateCourseIndex], ...action.payload.data };
            state.courses[updateCourseIndex] = updatedItem;
        },
    },
});

export const { addCourse,setCourses,deleteCourse,updateCourse} = CourseSlice.actions;
export const selectCourse = (state) => state.courses.courses;
export const selectCourseById = (state,id) => state.courses.courses.filter(course=> course.id == id);

export default CourseSlice.reducer;
