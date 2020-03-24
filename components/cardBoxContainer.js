import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Colors } from '../constants'

const CardBoxContainer = ({ onPress, title, description, length }) => {



    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <Text style={styles.text}>{title} {description} {length}</Text>
        </TouchableOpacity>
    )
}

export default CardBoxContainer

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        // alignItems: 'center',
        height: 100,
        margin: 10,
        backgroundColor: Colors.secondary,
        borderRadius: 10,
    },

    text: {
        color: 'white'
    }

})
