import React, { useState } from "react";
import { StyleSheet, View, Button, Alert } from 'react-native';
import MapView, { Marker } from "react-native-maps";
import {useNavigation} from "@react-navigation/native";

function MapScreen({ route }) {
    const navigation = useNavigation();
    const { setLocation, getlocation } = route.params;
    const initialRegion = {
        latitude: 7.0873,
        longitude: 79.9998,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    };
    const [selectedLocation, setSelectedLocation] = useState(setLocation?setLocation:initialRegion);

    const handleMapPress = (event) => {
        getlocation({
            latitude: event.nativeEvent.coordinate.latitude,
            longitude: event.nativeEvent.coordinate.longitude,
            latitudeDelta: initialRegion.latitudeDelta,
            longitudeDelta: initialRegion.longitudeDelta,
        });
        setSelectedLocation({
            latitude: event.nativeEvent.coordinate.latitude,
            longitude: event.nativeEvent.coordinate.longitude,
            latitudeDelta: initialRegion.latitudeDelta,
            longitudeDelta: initialRegion.longitudeDelta,
        });
    };

    const handleSaveLocation = () => {
        if (!selectedLocation) {
            Alert.alert('No location selected!', 'Please select a location on the map.', [{ text: 'Okay' }]);
            return;
        }
        navigation.goBack();
        // Do whatever you want with the selectedLocation
    };

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                onPress={handleMapPress}
                initialRegion={initialRegion}
            >
                {selectedLocation && (
                    <Marker coordinate={selectedLocation}/>
                )}
            </MapView>
            <View style={styles.buttonContainer}>
                <Button
                    title="Save Location"
                    onPress={handleSaveLocation}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
    },
});

export default MapScreen;
