import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Importing Redux hooks
import { StyleSheet, TouchableOpacity } from 'react-native';
import IconButton from '../components/UI/IconButton';
import { useNavigation } from '@react-navigation/native';
import { fetchCases } from '../util/http';
import {selectCase, setCase as setCaseAction} from '../slices/CaseSlice'; // Importing Redux actions
import StudentCasesOutput from '../components/StudentOutput/StudentCasesOutput';
import { GlobalStyles } from '../constants/styles';
import ChildCases from "./ChildCases";

function StudentCasesScreen() {
    const dispatch = useDispatch(); // Redux hook to dispatch actions
    const navigation = useNavigation();
    const cases = useSelector((state) => state.cases.cases); // Accessing cases state from Redux store
    useEffect(() => {
        async function getCases() {
            try {
                const casesFetch = await fetchCases();
                console.log("///////////////////casesFetch",casesFetch)
                dispatch(setCaseAction(casesFetch)); // Dispatching setCase action
            } catch (error) {
                console.error('Could not fetch expenses:', error);
                // Handle error as needed
            }
        }

        getCases();
    }, [dispatch]); // Added dispatch as a dependency

    return (
        <>
            <StudentCasesOutput
                totalCases="Total"
                fallbackText="No registered child cases found!"
            />
        </>
    );
}

export default StudentCasesScreen;

const styles = StyleSheet.create({
    addBtn: {
        position: 'absolute',
        bottom: 28,
        right: 15,
        backgroundColor: GlobalStyles.colors.primary400,
        borderRadius: 15,
    },
    addBtn1: {
        position: 'absolute',
        bottom: 68,
        right: 15,
        backgroundColor: GlobalStyles.colors.primary400,
        borderRadius: 15,
    },
});
