import {useContext, useLayoutEffect, useState} from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'; // Importing Redux hooks
import IconButton from '../UI/IconButton';
import { GlobalStyles } from '../../constants/styles';
import { DataTable } from 'react-native-paper';
import { getFormattedDate } from '../../util/date';
import {selectPreSchool} from "../../slices/PreSchoolSlice";
import {selectSchool} from "../../slices/SchoolSlice";
import { selectInstitute } from '../../slices/InstituteSlice';
import { selectGeneralId } from '../../slices/GeneralIdSlice';

function InstituteView({ route, navigation }) {
  const dispatch = useDispatch(); // Redux hook to dispatch actions
  const cases = useSelector(selectInstitute); // Accessing expenses state from Redux store

  const id = useSelector(selectGeneralId); // Accessing expenses state from Redux store
  const selectedData = cases.find(
      (data) => data.id === id
  );

  console.log("//////////////////////selected case",selectedData)

  function casePressHandler() {
    navigation.navigate('ManageInstitute', {
      instituteId: id
    });

  }
  return (

    <View style={styles.container}>
      <View style={styles.textwrap}>
        <Text style={styles.maintext}>School Details</Text>
      </View>
      <View style={{ paddingTop: 20}}>
        <DataTable.Row>
            <DataTable.Cell>Name</DataTable.Cell>
            <DataTable.Cell>{selectedData.name}</DataTable.Cell>
        </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>Contact Number</DataTable.Cell>
            <DataTable.Cell>{selectedData.contactNo}</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
            <DataTable.Cell>Description</DataTable.Cell>
            <DataTable.Cell>{selectedData.description}</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
            <DataTable.Cell>Detailed Name</DataTable.Cell>
            <DataTable.Cell>{selectedData.detailedName}</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
            <DataTable.Cell>Email</DataTable.Cell>
            <DataTable.Cell>{selectedData.email}</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
            <DataTable.Cell>Max NVQ</DataTable.Cell>
            <DataTable.Cell>{selectedData.maxNVQ}</DataTable.Cell>
        </DataTable.Row>
      </View>
      <TouchableOpacity style={styles.addBtn}>
          <IconButton
              icon="pencil"
              size={32}
              color={GlobalStyles.colors.primary800}
              onPress={casePressHandler}
          />
      </TouchableOpacity>
</View>

  );
}

export default InstituteView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff', // Adjust background color here as needed
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: '#ccc', // Adjust border color here as needed
    alignItems: 'center',
  },
  addBtn: {
    position: 'absolute',
    bottom: 28,
    right: 15,
    backgroundColor: GlobalStyles.colors.primary400,
    borderRadius: 15,
  },
  maintext: {
    color: "black",
    fontSize: 14,
    fontWeight: "bold",
  },
  textwrap: {
    marginBottom: 6,
  }
});
