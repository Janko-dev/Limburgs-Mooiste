import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Colors, globalStyles } from '../constants'

const CardBoxContainer = ({ onPress, title, description, length }) => {

    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <Text style={[globalStyles.headerText, styles.headText]}> {title} </Text>
            <Text style={[globalStyles.bodyText, styles.bodyText]}> Aantal weken: {length} </Text>
            <View style={styles.bodyContainer}>
                <Text style={[globalStyles.bodyText, styles.bodyText]}>{description} </Text>
            </View>
        </TouchableOpacity>
    )
}

export default CardBoxContainer

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
        margin: 10,
        padding: 10,
        backgroundColor: Colors.secondary,
        borderRadius: 10,
    },

    bodyContainer: {
        flex: 1,
        
    },

    headText: {
        color: Colors.primary,
        flex: 1
    },

    bodyText: {
        color: Colors.tertiary,
    }

})
