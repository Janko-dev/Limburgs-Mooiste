import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Colors } from '../../constants';

import firebase from '../../api/firebase';
import Card from '../../components/card';

const TrainingScreen = ({ navigation }) => {

    const [user, setUser] = useState(firebase.getCurrentUser())
    const [userRecord, setUserRecord] = useState(null);
    const [schedules, setSchedules] = useState(null);

    useEffect(() => {
        if (user){
            const unsubscribe = firebase.onUserDataChange(user.uid, userDoc => {
                setUserRecord(userDoc.data());
            })

            return unsubscribe
        }
    })

    useEffect(() => {
        firebase.getSchedules().then(result => {
            setSchedules(() => {
                return result.docs.map(doc => {
                    return { ...doc.data(), id: doc.id };
                })
            })
        })
    }, [])

    const navigateActiveSchedule = () => {
        navigation.navigate("Sessions", { activeSchedule: userRecord.activeSchedule });
    }

    const isActiveSchedulePresent = () => {
        if (userRecord && userRecord.activeSchedule) {
            return true;
        } else {
            return false;
        }
    }

    return (
        <View style={styles.container}>

            {isActiveSchedulePresent() ? 
                <TouchableOpacity onPress={navigateActiveSchedule} style={styles.activeScheduleContainer}>
                    <Text>Actief Schema</Text>
                </TouchableOpacity> : null}

            <View style={styles.schedulesContainer}>

                <FlatList
                    data={schedules ? schedules : null}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) =>
                        <Card
                            onPress={() => navigation.navigate('ScheduleDetails', {...item})}
                            title={item.titel}
                            description={item.beschrijving}
                            length={item.lengte}
                        />}
                />
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
        width: '95%',
        marginTop: '3%',
        backgroundColor: Colors.danger
    },

    schedulesContainer: {
        flex: 4,
        width: '95%',
        marginVertical: '3%',
        backgroundColor: Colors.tertiary,
        shadowColor: 'black',
        shadowOpacity: 0.8,
        shadowRadius: 10,
        shadowOffset: {width: 2, height: 4},
        borderRadius: 20
    }
});

export default TrainingScreen