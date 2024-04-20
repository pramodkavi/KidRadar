import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Importing Redux hooks
import { StyleSheet, TouchableOpacity } from 'react-native';
import IconButton from '../../components/UI/IconButton';
import { useNavigation } from '@react-navigation/native';
import {fetchCourses} from '../../util/http';
import { GlobalStyles } from '../../constants/styles';
import {selectInstitute, setInstitute} from "../../slices/InstituteSlice";
import CourseDetailsOutput from '../../components/CoursesOutput/CourseDetailsOutput';
import { selectCourse, setCourses } from '../../slices/CourseSlice';
import { selectGeneralId } from '../../slices/GeneralIdSlice';


function Courses() {
    console.log("I am in Course")
    // const editedInstituteId = route.params?.instituteId;
    // console.log("////////////////////////////////////////////////////////////// ID IS COMMING",editedInstitute)
    const dispatch = useDispatch(); // Redux hook to dispatch actions
    const courses = useSelector(selectCourse); // Accessing cases state from Redux store
    const generalId = useSelector(selectGeneralId)
    console.log("//////////////////////////////// General Id",generalId)
    useEffect(() => {
        async function getCourses() {
            try { 
                const coursesFetch = await fetchCourses(generalId);
                dispatch(setCourses(coursesFetch)); // Dispatching setCase action
            } catch (error) {
                console.error('Could not fetch courses:', error);
            }
        }
        getCourses();
    }, [dispatch]); // Added dispatch as a dependency

    console.log("////////////////////////////////// Courses",courses)
    return (
        <>
            <CourseDetailsOutput
                totalCases="Total"
                fallbackText="No registered child cases found!"
            />
            <TouchableOpacity style={styles.addBtn}>
                <IconButton
                    icon="add"
                    size={32}
                    color={GlobalStyles.colors.primary800}
                    onPress={() => {
                        navigation.navigate('ManageCourse');
                    }}
                />
            </TouchableOpacity>
        </>
    );
}

export default Courses;

const styles = StyleSheet.create({
    addBtn: {
        position: 'absolute',
        bottom: 28,
        right: 15,
        backgroundColor: GlobalStyles.colors.primary400,
        borderRadius: 15,
    },
});
