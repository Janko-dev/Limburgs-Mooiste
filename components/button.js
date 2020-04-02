import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

import { globalStyles, Colors } from '../constants';

export default ({ title, isActive, nextStep }) => {

    const buttonHandler = () => {
        if (isActive){
            nextStep();
        }
    }

    return (
        <TouchableOpacity activeOpacity={isActive ? 0.2 : 1} style={{ ...styles.buttonContainer, backgroundColor: isActive ? Colors.secondary : 'grey'  }} 
            onPress={buttonHandler}>
            <Text style={[globalStyles.bodyText, styles.buttonText]}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 60,
        height: 80,
        flex: 1,
        borderRadius: 20,
        backgroundColor: Colors.secondary,
        marginHorizontal: 5
    },

    buttonText: {
        fontSize: 24,
        color: Colors.tertiary
    }
})
