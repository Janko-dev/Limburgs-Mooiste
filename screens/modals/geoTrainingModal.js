import React, { useState } from 'react'
import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native';
import MapView, { Polygon } from 'react-native-maps';
import { globalStyles, Colors } from '../../constants';
import Markers from '../../components/markers';
import Animated from 'react-native-reanimated';

const GeoTrainingModal = ({ visible, onClose, markers, polygon, isPreview }) => {

    const [map, setMap] = useState(null);
    const [animatedValue] = useState(new Animated.Value(0));

    const startHandler = () => {
        Animated.timing(animatedValue, {
            toValue: 100,
            duration: 500,
        }).start()
    }

    return (
        <Modal visible={visible} animationType='slide'>
            <View style={{ flex: 1 }}>
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

                <TouchableOpacity style={[styles.button, styles.closeButton]} onPress={() => onClose()}>
                    <Text style={[globalStyles.headerText, { color: Colors.secondary }]}>Sluiten</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.button, styles.startButton]} onPress={startHandler}>
                    <Text style={[globalStyles.headerText, { color: Colors.secondary }]}>start</Text>
                </TouchableOpacity>

            </View>
            <View style={{bottom: -100, height: 100, transform: [{translateY: animatedValue}]}}>
                <Text>test</Text>
            </View>

        </Modal>
    )
}

export default GeoTrainingModal

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: Colors.secondary
    },

    closeButton: {
        position: 'absolute',
        top: '3%',
        right: '15%',
        width: '80%',
        height: '10%',

    },

    startButton: {
        position: 'absolute',
        bottom: '3%',
        right: '40%',
        width: '20%',
        height: '10%',

    }
})
