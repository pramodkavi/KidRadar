import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Importing Redux hooks
import { StyleSheet, TouchableOpacity } from 'react-native';
import IconButton from '../../components/UI/IconButton';
import { useNavigation } from '@react-navigation/native';
import {fetchPreSchoolCases, fetchPreSchoolCasesCount, fetchPreSchools, fetchSchools} from '../../util/http';
import {selectPreSchoolCase, setPreSchoolCase} from '../../slices/PreSchoolCasesSlice'; // Importing Redux actions
import { GlobalStyles } from '../../constants/styles';
import PreSchoolOutput from "../../components/PreSchoolOutput/PreSchoolOutput";
import {setPreSchoolCasesCount} from "../../slices/PreSchoolCasesCountSlice";
import {setPreSchool} from "../../slices/PreSchoolSlice";
import SchoolOutput from "../../components/SchoolOutput/SchoolOutput";
import {setSchools} from "../../slices/SchoolSlice";

function SchoolDetails() {
    const dispatch = useDispatch(); // Redux hook to dispatch actions
    const navigation = useNavigation();
    const preSchoolCasesCount = useSelector((state) => state.preSchoolCasesCount.preSchoolCasesCount);

    useEffect(() => {
        async function getPreSchool() {
            try {
                const fetchPreSchoolDetails = await fetchSchools();
                console.log("/////////////////////fetchSchoolDetails",fetchPreSchoolDetails)
                dispatch(setSchools(fetchPreSchoolDetails));
            } catch (error) {
                console.error('Could not fetch preschool details:', error);
            }
        }

        getPreSchool();
    }, [dispatch]); // Added dispatch as a dependency

    return (
        <>
            <SchoolOutput
                totalCases="Total"
                fallbackText="No registered PreSchool found!"
            />
            <TouchableOpacity style={styles.addBtn}>
                <IconButton
                    icon="add"
                    size={32}
                    color={GlobalStyles.colors.primary800}
                    onPress={() => {
                        navigation.navigate('ManageSchoolDetails');
                    }}
                />
            </TouchableOpacity>
        </>
    );
}

export default SchoolDetails;

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
        bottom: 90,
        right: 15,
        backgroundColor: GlobalStyles.colors.primary400,
        borderRadius: 15,
    },
});
