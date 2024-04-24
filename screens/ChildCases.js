import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Importing Redux hooks
import { StyleSheet, TouchableOpacity } from 'react-native';
import IconButton from '../components/UI/IconButton';
import { useNavigation } from '@react-navigation/native';
import { fetchCases } from '../util/http';
import {selectCase, setCase as setCaseAction} from '../slices/CaseSlice'; // Importing Redux actions
import ChildCasesOutput from '../components/CasesOutput/ChildCasesOutput';
import { GlobalStyles } from '../constants/styles';
import { AuthContext } from '../store/auth-context';

function ChildCases() {
    const dispatch = useDispatch(); // Redux hook to dispatch actions
    const navigation = useNavigation();
    const cases = useSelector((state) => state.cases.cases); // Accessing cases state from Redux store
    const authCtx = useContext(AuthContext);
    useEffect(() => {
        async function getCases() {
            try {
                const uId = authCtx.uId;
                const casesFetch = await fetchCases(uId);
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
            <ChildCasesOutput
                totalCases="Total"
                fallbackText="No registered child cases found!"
            />
            <TouchableOpacity style={styles.addBtn}>
                <IconButton
                    icon="add"
                    size={32}
                    color={GlobalStyles.colors.primary800}
                    onPress={() => {
                        navigation.navigate('ManageChildCases');
                    }}
                />
            </TouchableOpacity>
        </>
    );
}

export default ChildCases;

const styles = StyleSheet.create({
    addBtn: {
        position: 'absolute',
        bottom: 28,
        right: 15,
        backgroundColor: GlobalStyles.colors.primary400,
        borderRadius: 15,
    },
});
