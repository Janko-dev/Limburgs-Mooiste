import React, { useState } from 'react'
import { StyleSheet, Text, View, Animated, FlatList, TouchableOpacity } from 'react-native'
import { Colors } from '../constants';
import { Icon } from 'react-native-elements';

const WaypointChecklist = ({ markers, positionStyle, checked }) => {

    const [waypoints, setWaypoints] = useState(markers);

    return (
        <Animated.View style={[styles.container, positionStyle]}>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={waypoints}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => <Checkmark length={waypoints.length} index={index} checked={checked.includes(index)}/>}
            />
        </Animated.View>
    )
}

const Checkmark = ({ index, length, checked }) => {

    return (
        <View style={[styles.checkbox, index == 0 ? styles.startCheckmark : index == length - 1 ? styles.finishCheckmark : checked ? styles.checked: null]}>
            <Text style={{color: index == length - 1 ? 'black' : 'white'}}>{index == 0 ? 'Start' : index == length - 1 ? 'Finish' : `WP: ${index + 1}`}</Text>
            
            {checked && <Icon 
                name='check'
                size={30}
                color={index == length - 1 ? 'black' : Colors.success}
            />}
        </View>
    )
}

export default WaypointChecklist

const styles = StyleSheet.create({
    container: {
        width: '15%',
        height: '55%',
        backgroundColor: 'white',
        borderRadius: 10,
        borderColor: Colors.secondary,
        borderWidth: 1
    },

    checkbox: {
        width: '100%',
        // height: '100%',
        // flex: 1,
        height: 50,
        marginVertical: 1,
        borderRadius: 10,
        backgroundColor: Colors.secondary,
        alignItems: 'center',
        justifyContent: 'center'
    },

    startCheckmark: {
        backgroundColor: 'red'
    },

    finishCheckmark: {
        backgroundColor: Colors.success//'lightgreen'
    },

    checked: {
        backgroundColor: 'green'
    }
})
