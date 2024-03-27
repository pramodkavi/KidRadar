import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Importing Redux hooks
import { StyleSheet, TouchableOpacity } from 'react-native';
import IconButton from '../../components/UI/IconButton';
import { useNavigation } from '@react-navigation/native';
import {fetchPreSchoolCases, fetchPreSchoolCasesCount} from '../../util/http';
import {selectPreSchoolCase, setPreSchoolCase} from '../../slices/PreSchoolCasesSlice'; // Importing Redux actions
import { GlobalStyles } from '../../constants/styles';
import PreSchoolCasesOutput from "../../components/PreSchoolCasesOutput/PreSchoolCasesOutput";
import {setPreSchoolCasesCount} from "../../slices/PreSchoolCasesCountSlice";
import PreSchoolOutput from '../../components/PreSchoolOutput/PreSchoolOutput';

function PreSchoolDetails() {
    const dispatch = useDispatch(); // Redux hook to dispatch actions
    const navigation = useNavigation();
    const preSchoolCasesCount = useSelector((state) => state.preSchoolCasesCount.preSchoolCasesCount);

    useEffect(() => {
        async function getCases() {
            // try {
            //     const preCasesFetch = await fetchPreSchoolCases();
            //     dispatch(setPreSchoolCase(preCasesFetch)); // Dispatching setCase action

            //     const preCasesCountFetch=await fetchPreSchoolCasesCount();
            //     dispatch(setPreSchoolCasesCount(preCasesCountFetch)); // Dispatching setCase action


            // } catch (error) {
            //     console.error('Could not fetch expenses:', error);
            // }
        }

        getCases();
    }, [dispatch]); // Added dispatch as a dependency

    return (
        <>
            <PreSchoolOutput
                totalCases="Total"
                fallbackText="No registered child cases found!"
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
