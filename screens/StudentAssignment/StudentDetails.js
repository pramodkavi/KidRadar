import { StyleSheet, TouchableOpacity } from 'react-native';
import { GlobalStyles } from '../../constants/styles';
import StudentOutput from "../../components/StudentAssignmentOutput/StudentOutput";

function StudentDetails() {
    return (
        <>
            <StudentOutput
                totalCases="Total"
                fallbackText="No registered PreSchool found!"
            />
        </>
    );
}

export default StudentDetails;

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
