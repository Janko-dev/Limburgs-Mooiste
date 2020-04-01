import React, { useState } from 'react'
import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native';
import MapView, { Polygon } from 'react-native-maps';
import { globalStyles, Colors } from '../../constants';
import Markers from '../../components/markers';

const GeoTrainingModal = ({ visible, onClose, markers, polygon }) => {

    const [map, setMap] = useState(null);

    // console.log(map)

    return (
        <Modal visible={visible} animationType='slide'>
            <MapView
                // provider={'google'}
                ref={map => setMap(map)}
                style={{ flex: 1 }}
                loadingEnabled={true}
                // showsUserLocation={true}
                onMapReady={() => map.fitToElements(true)}
            >
                <Polygon coordinates={polygon} strokeWidth={2} strokeColor={'red'} />
                <Markers markers={markers} />
            </MapView>

            <TouchableOpacity style={styles.button} onPress={() => onClose()}>
                <Text style={[globalStyles.headerText, { color: Colors.secondary }]}>Sluiten</Text>
            </TouchableOpacity>

        </Modal>
    )
}

export default GeoTrainingModal

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        top: '5%',
        right: '5%',
        width: '20%',
        height: '10%',
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20
    }
})
