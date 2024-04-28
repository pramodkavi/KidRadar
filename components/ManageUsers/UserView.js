import {useContext, useLayoutEffect, useState} from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'; // Importing Redux hooks
import IconButton from '../UI/IconButton';
import { GlobalStyles } from '../../constants/styles';
import { DataTable } from 'react-native-paper';
import { getFormattedDate } from '../../util/date';
import Button from '../UI/Button';

function UserView({ route, navigation }) {
  const dispatch = useDispatch(); // Redux hook to dispatch actions
  const cases = useSelector(state => state.users.users); // Accessing expenses state from Redux store
  const selectedUser = cases[0];

  useLayoutEffect(() => {
    navigation.setOptions({
      title:  'User Details',
    });
  }, [navigation]);

  function casePressHandler() {
    navigation.navigate('Manage User Details', {
      userId: selectedUser.id
    });
  }
  

  return (

    <View style={styles.container}>
      <View style={styles.textwrap}>
        <Text style={styles.maintext}>Case Details</Text>
      </View>
      <View style={{ paddingTop: 20}}>
        <DataTable.Row>
            <DataTable.Cell>Name</DataTable.Cell>
            <DataTable.Cell>{selectedUser.name}</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
            <DataTable.Cell>Phone Number</DataTable.Cell>
            <DataTable.Cell>{selectedUser.phoneNumber}</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
            <DataTable.Cell>Designation</DataTable.Cell>
            <DataTable.Cell>{selectedUser.designation}</DataTable.Cell>
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

export default UserView;

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
