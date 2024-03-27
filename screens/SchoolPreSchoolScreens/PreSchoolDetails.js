import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Importing Redux hooks
import { StyleSheet, TouchableOpacity } from 'react-native';
import IconButton from '../../components/UI/IconButton';
import { useNavigation } from '@react-navigation/native';
import {fetchPreSchoolCases, fetchPreSchoolCasesCount, fetchPreSchools} from '../../util/http';
import {selectPreSchoolCase, setPreSchoolCase} from '../../slices/PreSchoolCasesSlice'; // Importing Redux actions
import { GlobalStyles } from '../../constants/styles';
import PreSchoolOutput from "../../components/PreSchoolOutput/PreSchoolOutput";
import {setPreSchoolCasesCount} from "../../slices/PreSchoolCasesCountSlice";
import {setPreSchool} from "../../slices/PreSchoolSlice";

function PreSchoolDetails() {
    const dispatch = useDispatch(); // Redux hook to dispatch actions
    const navigation = useNavigation();

    useEffect(() => {
        async function getPreSchool() {
            try {
                const fetchPreSchoolDetails = await fetchPreSchools();
                console.log("/////////////////////fetchPreSchoolDetails",fetchPreSchoolDetails)
                dispatch(setPreSchool(fetchPreSchoolDetails));
            } catch (error) {
                console.error('Could not fetch preschool details:', error);
            }
        }

        getPreSchool();
    }, [dispatch]); // Added dispatch as a dependency

    return (
        <>
            <PreSchoolOutput
                totalCases="Total"
                fallbackText="No registered PreSchool found!"
            />
            <TouchableOpacity style={styles.addBtn}>
                <IconButton
                    icon="add"
                    size={32}
                    color={GlobalStyles.colors.primary800}
                    onPress={() => {
                        navigation.navigate('ManagePreSchoolDetails');
                    }}
                />
            </TouchableOpacity>
        </>
    );
}

export default PreSchoolDetails;

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
