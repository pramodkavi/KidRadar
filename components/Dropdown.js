import { SelectList } from 'react-native-dropdown-select-list'
import React from "react";
import {ArrowLongRightIcon} from "react-native-heroicons/solid";
import {MagnifyingGlassIcon} from "react-native-heroicons/outline";
import {StyleSheet} from "react-native";
import {themeColors} from "../../theme";
import {GlobalStyles} from "../constants/styles";

export default function Dropdown({data,inputHandler,keyName}) {

    const [selected, setSelected] = React.useState("");
    var data = [
        {value:'Jammu & Kashmir'},
        {value:'Gujrat'},
        {value:'Maharashtra'},
        {value:'Goa'},
    ];

    return(
        <SelectList
            setSelected={(val) => setSelected(val)}
            data={data}
            // setSelected={(val) => inputHandler(keyName,val)}
            // data={data}
            arrowicon={<ArrowLongRightIcon  size="25" color="black" />}
            searchicon={<MagnifyingGlassIcon size="25" color="black" />}
            search={false}
            boxStyles={styles.dropdown} //override default styles
            defaultOption={{value:'Jammu & Kashmir' }}   //default selected option
            dropdownStyles={styles.dropdownView} //override default styles
            inputStyles={{color: GlobalStyles.colors.primary700,fontSize:17}} //override default styles
            dropdownTextStyles={{color: GlobalStyles.colors.primary700,}} //override default styles
        />
    )

};

const styles = StyleSheet.create({
    dropdown: {
        paddingHorizontal: 24,
        borderRadius:10,
        borderWidth:0,
        backgroundColor: themeColors.bgInput(0.1),
        color: GlobalStyles.colors.primary700,
    },
    dropdownView: {
        paddingHorizontal: 24,
        borderRadius:20,
        borderWidth:0,
        backgroundColor: themeColors.bgInput(0.1),
    }
});