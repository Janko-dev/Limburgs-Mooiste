import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { globalStyles, Colors } from '../../constants';
import NextTraining from './nextTraining';
import Motivation from './motivation';
import FeedListItem from './feedListItem';

import firebase from '../../api/firebase';
import LoadingModal from '../modals/loadingModal';

const DashboardScreen = ({ navigation }) => {

    const [refreshState, setRefreshState] = useState(false);

    const [prevTrainSessions, setPrevTrainSessions] = useState([]);
    const [user, setUser] = useState(firebase.getCurrentUser());
    // const [isLoading, setIsLoading] = useState(false);
    const [userRecord, setUserRecord] = useState(null)
    const [schedule, setSchedule] = useState(null)

    // useEffect(() => {
    //     const unsubscribe = firebase.onAuthChange(user => {
    //         setUser(user)
    //     })
    //     return unsubscribe;
    // }, [user])

    useEffect(() => {
        // setUser(firebase.getCurrentUser())
        if (firebase.getCurrentUser()) {
            const unsubscribe = firebase.onUserDataChange(firebase.getCurrentUser().uid, doc => {
                setUserRecord(doc.data())

            })
            return unsubscribe;
        }
    }, [userRecord])

    useEffect(() => {
        if (userRecord?.activeSchedule) {
            firebase.getSchedule(userRecord.activeSchedule.id).then(result => {
                setSchedule(result.data())
            })
            // setIsLoading(false);

        }

    }, [])

    const getData = async () => {
        // const user = await firebase.getCurrentUser();

        // if (user) {
        //     const unsubscribe = await firebase.onUserDataChange(user?.uid, doc => {
        //         console.log(doc.data().previousTrainingSessions + "Hey ik ben je data");
        //         setPrevTrainSessions(doc.data().previousTrainingSessions);
        //     })

        //     return unsubscribe;
        // }
    }

    const handleRefresh = () => {
        getData();
        setRefreshState(false);
    }

    const renderHeader = () => {
        return (
            <View style={styles.headerContainer}>
                <View style={[{ backgroundColor: Colors.secondary }, styles.headerNextTraining]}>
                    <Text style={[{ color: Colors.tertiary }, globalStyles.headerText]}>Volgende Training</Text>
                </View>
                <NextTraining schedule={userRecord?.activeSchedule} navigation={navigation} />
                <Motivation user={firebase.getCurrentUser()} />
                <View style={styles.feedHeader}>
                    <Text style={styles.buttonText}>Your Feed</Text>
                </View>
                <View style={{
                    height: 1,
                    marginLeft: '2%',
                    marginRight: "2%",
                    backgroundColor: "#CED0CE",
                    justifyContent: 'center'
                }}
                />
            </View>
        )
    }

    const renderSeparator = () => {
        return (
            <View style={{
                height: 1,
                marginLeft: '2%',
                marginRight: "2%",
                backgroundColor: "#CED0CE",
                justifyContent: 'center'
            }}
            />
        )
    }

    return (
        <View style={styles.mainContainer}>
            {/* <LoadingModal isLoading={isLoading} /> */}
            <FlatList
                data={userRecord?.previousTrainingSessions}
                keyExtractor={(data, index) => index.toString()}
                ListHeaderComponent={renderHeader}
                ItemSeparatorComponent={renderSeparator}
                refreshing={refreshState}
                onRefresh={handleRefresh}
                renderItem={(data, index) => <FeedListItem
                    key={index}
                    sessie={data.item.currentSession}
                    week={data.item.currentWeek}
                    completed={data.item.isCompleted}
                    earnedMedal={data.item.medal}
                    routeID={data.item.routeId}
                    sheduleID={data.item.scheduleId}
                    waypoints={data.item.totalWaypoints}
                    reachedWaypoints={data.item.waypointReached}
                    start={data.item.startTime}
                    stop={data.item.stopTime}
                    userRecord={userRecord}
                />}
            />
        </View>

    )
}


const styles = StyleSheet.create({
    headerNextTraining: {
        padding: '1%',
        marginLeft: '2%',
        marginRight: "2%",
        marginTop: '2%',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        borderTopStartRadius: 10,
        borderTopEndRadius: 10,
        alignItems: 'center'
    },
    feedHeader: {
        alignItems: 'center',
        marginTop: 10,
        borderTopStartRadius: 10,
        borderTopEndRadius: 10,
        padding: 10,
        backgroundColor: Colors.secondary,
        marginLeft: '2%',
        marginRight: "2%",
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.26
    },
    mainContainer: {
        flex: 1
    },
    headerContainer: {
        flex: 5
    },
    buttonText: {
        color: Colors.tertiary,
        fontSize: 18,
        fontWeight: 'bold'
    }
});

export default DashboardScreen