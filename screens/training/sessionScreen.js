import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import firebase from '../../api/firebase';
import { globalStyles } from '../../constants';

const SessionScreen = ({ navigation, route }) => {

    const [user, setUser] = useState(firebase.getCurrentUser());
    const [userRecord, setUserRecord] = useState(null);
    const [schedule, setSchedule] = useState(route.params);
    const [deadline, setDeadline] = useState(null);
    const [remainingTime, setRemainingTime] = useState(null);

    useEffect(() => {
        if (user) {
            const unsubscribe = firebase.onUserDataChange(user.uid, userDoc => {
                setUserRecord(userDoc.data());
                // console.log(userDoc.data().activeSchedule.startDate)
            })
            return unsubscribe;
        }
    })

    useEffect(() => {

        if (userRecord){
            let dl = userRecord.activeSchedule.startDate.toDate()
            dl.setDate(userRecord.activeSchedule.startDate.toDate().getDate() + userRecord.activeSchedule.currentWeek * 7)
            setDeadline(dl);
            setRemainingTime(() => new Date(Math.abs(new Date() - dl)))
        }

    }, [userRecord]);

    return (
        <View style={[globalStyles.container]}>
            {/* <Text>{userRecord?.activeSchedule.currentWeek} / {schedule?.lengte}</Text>
            <Text>{schedule?.titel}</Text>
            <Text>{getTimeRemaining()}</Text> */}
            <Text>{deadline?.toDateString()}</Text>
            <Text>{remainingTime?.toString()}</Text>
        </View>
    )
}

export default SessionScreen

const styles = StyleSheet.create({})
