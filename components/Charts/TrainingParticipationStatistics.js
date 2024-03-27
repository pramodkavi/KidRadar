import {View, Dimensions, StyleSheet, Text} from 'react-native';

import {
    BarChart,
} from 'react-native-chart-kit'
import {Button} from "react-native-paper";
import React from "react";

const data = {
    labels: ['NAITA', 'VTA', 'HND', 'VTC', 'FLITC', 'SLMWC'],
    datasets: [{
        data: [
            50,
            20,
            2,
            86,
            71,
            100
        ],
        // color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})` // optional
    },{
        data: [
            20,
            10,
            4,
            56,
            87,
            90
        ]
    },{
        data: [
            30,
            90,
            67,
            54,
            10,
            2
        ]
    }]
}
const chartConfig = {
    backgroundGradientFrom: "#fff",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#fff",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(54, 33, 141, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    decimalPlaces: 0,
    useShadowColorFromDataset: false // optional
};
const graphStyle = {
    marginVertical: 1,
    marginRight: 10,
    ...chartConfig.style
}

export default function TrainingParticipationStatistics() {
    const width = Dimensions.get('window').width
    const height = 220

    return (
        <>
            <View style={styles.chartHeader}>
                <Text style={styles.headerTxt}>Training Participation Statistics</Text>
                <Button mode="outlined" >
                    Load more
                </Button>
            </View>
            <View class={"pt-20"}>
                <BarChart
                    width={width}
                    height={height}
                    data={data}
                    chartConfig={chartConfig}
                    style={graphStyle}
                />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    chartHeader: {
        marginTop:8,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:"center",
    },
    headerTxt:{
        fontSize:15,
        fontWeight:"bold"
    }
});