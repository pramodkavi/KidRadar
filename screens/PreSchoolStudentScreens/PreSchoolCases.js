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

function PreSchoolCases() {
    const dispatch = useDispatch(); // Redux hook to dispatch actions
    const navigation = useNavigation();
    const preSchoolCasesCount = useSelector((state) => state.preSchoolCasesCount.preSchoolCasesCount);

    useEffect(() => {
        async function getCases() {
            try {
                const preCasesFetch = await fetchPreSchoolCases();
                dispatch(setPreSchoolCase(preCasesFetch)); // Dispatching setCase action

                const preCasesCountFetch=await fetchPreSchoolCasesCount();
                console.log("///////////////////preCasesCountFetch",preCasesCountFetch);
                dispatch(setPreSchoolCasesCount(preCasesCountFetch)); // Dispatching setCase action
                console.log("///////////////////After preCasesCountFetch",preCasesCountFetch);


            } catch (error) {
                console.error('Could not fetch expenses:', error);
            }
        }

        getCases();
    }, [dispatch]); // Added dispatch as a dependency

    return (
        <>
            <PreSchoolCasesOutput
                totalCases="Total"
                fallbackText="No registered child cases found!"
            />
            <TouchableOpacity style={styles.addBtn}>
                <IconButton
                    icon="add"
                    size={32}
                    color={GlobalStyles.colors.primary800}
                    onPress={() => {
                        navigation.navigate('ManagePreSchoolCases');
                    }}
                />
            </TouchableOpacity>
            <TouchableOpacity style={styles.addBtn1}>
                <IconButton
                    icon="add"
                    size={32}
                    color={GlobalStyles.colors.primary800}
                    onPress={() => {
                        navigation.navigate('ManagePreSchoolCasesCount');
                    }}
                />
            </TouchableOpacity>
        </>
    );
}

export default PreSchoolCases;

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
