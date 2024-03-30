import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import {GlobalStyles} from "../constants/styles";

const data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
];

const DropdownComponent = (prop) => {
    const [value, setValue] = useState(null);
    const enterData = prop.data ? prop.data : data;
    const renderItem = item => {
        return (
            <View style={styles.item}>
                <Text style={styles.textItem}>{item.label}</Text>
                {/*{item.value === value && (*/}
                {/*    <AntDesign*/}
                {/*        style={styles.icon}*/}
                {/*        color="black"*/}
                {/*        name="Safety"*/}
                {/*        size={20}*/}
                {/*    />*/}
                {/*)}*/}
            </View>
        );
    };

    return (
        <Dropdown
            style={[styles.dropdown, prop.invalid && { backgroundColor: GlobalStyles.colors.error50}]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={enterData}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={prop.label}
            searchPlaceholder="Search..."
            {...prop.textInputConfig}
            // value={"Test"}
            // onChange={item => {
            //     setValue(item.value);
            // }}
            // renderLeftIcon={() => (
            //     <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
            // )}
            renderItem={renderItem}
        />
    );
};

export default DropdownComponent;

const styles = StyleSheet.create({
    dropdown: {
        margin: 8,
        marginLeft:0,
        height: 40,
        width: 110,
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,

        elevation: 2,
    },
    icon: {
        marginRight: 5,
    },
    item: {
        padding: 17,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textItem: {
        flex: 1,
        fontSize: 16,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});