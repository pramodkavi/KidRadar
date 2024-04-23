import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Importing Redux hooks
import { StyleSheet, TouchableOpacity } from 'react-native';
import IconButton from '../../components/UI/IconButton';
import { useNavigation } from '@react-navigation/native';
import {fetchCases, fetchInstitute} from '../../util/http';
import {selectCase, setCase as setCaseAction} from '../../slices/CaseSlice'; // Importing Redux actions
import { GlobalStyles } from '../../constants/styles';
import InstituteDetailsOutput from "../../components/InstitutesOutput/InstituteDetailsOutput";
import {selectInstitute, setInstitute} from "../../slices/InstituteSlice";


function Institutes() {
    const dispatch = useDispatch(); // Redux hook to dispatch actions
    const navigation = useNavigation();
    const institutes = useSelector(selectInstitute); // Accessing cases state from Redux store
    

    return (
        <>
            <InstituteDetailsOutput
                totalCases="Total"
                fallbackText="No registered child cases found!"
            />
            <TouchableOpacity style={styles.addBtn}>
                <IconButton
                    icon="add"
                    size={32}
                    color={GlobalStyles.colors.primary800}
                    onPress={() => {
                        navigation.navigate('ManageInstitute');
                    }}
                />
            </TouchableOpacity>
        </>
    );
}

export default Institutes;

const styles = StyleSheet.create({
    addBtn: {
        position: 'absolute',
        bottom: 28,
        right: 15,
        backgroundColor: GlobalStyles.colors.primary400,
        borderRadius: 15,
    },
});
