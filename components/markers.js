import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Marker } from 'react-native-maps';

const Markers = ({ markers }) => {
    return markers.map((marker, index) => (
        <Marker
            key={index}
            coordinate={{
                latitude: marker.geometry.coordinates['1'],
                longitude: marker.geometry.coordinates['0']
            }}
            identifier={index.toString()}
        >
        </Marker>
    ))
}

export default Markers

const styles = StyleSheet.create({})
