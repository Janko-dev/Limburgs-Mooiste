import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Colors, globalStyles } from '../../constants';

import firebase from '../../api/firebase';
import Card from '../../components/card';
import LoadingModal from '../modals/loadingModal';

const TrainingScreen = ({ navigation }) => {

    const [user, setUser] = useState(firebase.getCurrentUser())
    const [userRecord, setUserRecord] = useState(null);
    const [schedules, setSchedules] = useState(null);
    const [activeSchedule, setActiveSchedule] = useState(null);
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {
        if (user) {
            const unsubscribe = firebase.onUserDataChange(user.uid, userDoc => {
                setUserRecord(userDoc.data());

                if (userDoc.data().activeSchedule) {
                    firebase.getSchedule(userDoc.data().activeSchedule.id).then(result => {
                        setActiveSchedule(result.data());
                    })
                }
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
            setIsLoading(false)
        })

    }, [])

    useEffect(() => {
        if (userRecord?.activeSchedule && activeSchedule) {

            if (userRecord.activeSchedule.currentWeek > activeSchedule.lengte) {
                firebase.deleteActiveSchedule(user.uid);
                return;
            }

            let deadline = userRecord.activeSchedule.startDate.toDate()
            deadline.setDate(deadline.getDate() + userRecord.activeSchedule.currentWeek * 7)

            // console.log(deadline - new Date())
            if (deadline - new Date() < 0) {
                firebase.incrementCurrentScheduleWeek(user.uid, userRecord.activeSchedule);
            }
        }

    }, [userRecord])

    const navigateActiveSchedule = () => {
        navigation.navigate("Sessions", { ...activeSchedule });
    }

    return (
        <View style={styles.container}>
            
            <LoadingModal isLoading={isLoading}/>

            {userRecord?.activeSchedule ?
                <TouchableOpacity onPress={navigateActiveSchedule} style={styles.activeScheduleContainer}>
                    <Text style={[globalStyles.bodyText, styles.activeScheduleHeaderText]}>Actief Schema</Text>
                    <Text style={[globalStyles.bodyText, styles.activeScheduleBodyText]}>
                        {activeSchedule?.titel}
                    </Text>
                    <Text style={[globalStyles.bodyText, styles.activeScheduleBodyText]}>
                        Week: {userRecord?.activeSchedule.currentWeek} / {activeSchedule?.lengte}
                    </Text>
                </TouchableOpacity> : null}

            <View style={styles.schedulesContainer}>

                <FlatList
                    data={schedules ? schedules : null}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) =>
                        <Card
                            onPress={() => navigation.navigate('Details', {
                                ...item,
                                uid: user.uid,
                                hasSchedule: userRecord.activeSchedule ? true : false
                            })}
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
        backgroundColor: Colors.primary,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',

    },

    activeScheduleHeaderText: {
        fontSize: 20,
        color: Colors.secondary
    },

    activeScheduleBodyText: {
        fontSize: 12,
        color: Colors.tertiary
    },

    schedulesContainer: {
        flex: 4,
        width: '95%',
        marginVertical: '3%',
        backgroundColor: Colors.tertiary,
        shadowColor: 'black',
        shadowOpacity: 0.8,
        shadowRadius: 10,
        shadowOffset: { width: 2, height: 4 },
        borderRadius: 20
    }
});

export default TrainingScreen