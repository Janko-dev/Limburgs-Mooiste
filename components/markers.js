import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Marker } from 'react-native-maps';

const Markers = ({ markers, onPress }) => {
    return markers.map((marker, index) => (
        <Marker
            key={index}
            coordinate={{
                latitude: marker.geometry.coordinates['1'],
                longitude: marker.geometry.coordinates['0']
            }}
            identifier={index.toString()}
            onPress={() => onPress(marker, index)}
            pinColor={index == 0 ? 'red' : index == markers.length - 1 ? 'green': 'blue'}
        >
        </Marker>
    ))
}

export default Markers

const styles = StyleSheet.create({})
