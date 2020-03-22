import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../../constants';

import firebase from '../../api/firebase';

const TrainingScreen = props => {

    const [user, setUser] = useState(firebase.getCurrentUser())
    const [userRecord, setUserRecord] = useState(null);

    useEffect(() => {
        firebase.getUserFromDB(user.uid).then(userDoc => {
            setUserRecord(userDoc.data());
        })
    })

    const isActiveSchedulePresent = () => {

        if (userRecord){
            if (userRecord.activeSchedule){
                return (
                <TouchableOpacity style={styles.activeScheduleContainer}>
                    <Text>test</Text>
                </TouchableOpacity>
                )
            }
        }
    }

    return (
        <View style={styles.container}>

            {isActiveSchedulePresent()}

            <View style={styles.schedulesContainer}>
                <Text>Schema's</Text>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.tertiary,
        alignItems: 'center',
        justifyContent: 'center',
    },

    activeScheduleContainer: {
        flex: 1,
        width: '90%',
        marginVertical: '5%',
        backgroundColor: Colors.danger
    },

    schedulesContainer: {
        flex: 4,
        width: '90%',
        backgroundColor: Colors.warning
    }
});

export default TrainingScreen