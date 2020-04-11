import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import firebase from '../../api/firebase';
import Utils from '../../api/utils';
import { globalStyles, Colors } from '../../constants';
import { Icon } from 'react-native-elements';
import Modal from 'react-native-modal';
import LoadingModal from '../modals/loadingModal';
import GeoTrainingModal from '../modals/geoTrainingModal';
import SessionAnalyticsModal from '../modals/sessionAnaliticsModal'

const SessionScreen = ({ navigation, route }) => {

    const [user, setUser] = useState(firebase.getCurrentUser());
    const [userRecord, setUserRecord] = useState(null);

    const [schedule, setSchedule] = useState(route.params);
    const [deadline, setDeadline] = useState(null);
    const [remainingTime, setRemainingTime] = useState(null);

    const [descriptionModal, setDescriptionModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isGeoModalVisible, setIsGeoModalVisible] = useState(false);
    const [isAnalyticsModal, setIsAnalyticsModal] = useState(false);
    const [analyticsData, setAnalyticsData] = useState(null);

    const [markers, setMarkers] = useState(null);
    const [polygon, setPolygon] = useState(null);
    const [currentRouteId, setCurrentRouteId] = useState(null);
    const [geoData, setGeoData] = useState(null)

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
        firebase.getAllRoutes(data => {
            let routes = data.toJSON();
            let sessionIDs = route.params.sessies.map(item => item.routeID)
            Object.keys(routes).forEach(key => {
                if (!sessionIDs.includes(key)) {
                    delete routes[key];
                }
            })
            setGeoData(routes);
            setIsLoading(false);
        })

    }, [])

    useEffect(() => {
        if (userRecord) {
            let dl = userRecord.activeSchedule.startDate.toDate()
            dl.setDate(userRecord.activeSchedule.startDate.toDate().getDate() + userRecord.activeSchedule.currentWeek * 7)
            setDeadline(dl);
            setRemainingTime(() => new Date(Math.abs(new Date() - dl)))
        }

    }, [userRecord]);

    const openRoutehandler = (routeID) => {
        setMarkers(() => Utils.getMarkersFromRoute(geoData[routeID]))
        setPolygon(() => Utils.getPolygonFromRoute(geoData[routeID]))
        setCurrentRouteId(routeID);
        setIsGeoModalVisible(true)
    }

    const closeHandler = (started, waypoints, startTime, stopTime, isCompleted, routeId, waypointsLength) => {
        setIsGeoModalVisible(false)
        if (started) {

            let earnedExp = userRecord.exp;
            let medal = 'nvt';

            waypoints.forEach(() => {
                earnedExp += 5;
            })

            if (isCompleted) {
                earnedExp += 15
                let time = Math.abs(stopTime - startTime) / 1000 / 60 / 60
                let criteria = schedule.sessies.find(item => routeId === item.routeID).kwaliteitsCriteria;
                if (time < criteria.goud.tijd) {
                    earnedExp += criteria.goud.beloning;
                    medal = "gold"
                } else if (time < criteria.zilver.tijd) {
                    earnedExp += criteria.zilver.beloning
                    medal = "silver"
                } else if (time < criteria.bronze.tijd) {
                    earnedExp += criteria.bronze.beloning
                    medal = "bronze"
                }
            }

            if (earnedExp > userRecord.exp) {
                firebase.setExp(earnedExp, user.uid)
            }

            let sessionData = {
                isCompleted,
                startTime,
                stopTime,
                currentSession: userRecord.activeSchedule.currentSession,
                currentWeek: userRecord.activeSchedule.currentWeek,
                scheduleId: userRecord.activeSchedule.id,
                routeId,
                medal,
                waypointReached: waypoints.length,
                totalWaypoints: waypointsLength
            }

            userRecord.previousTrainingSessions.push(sessionData)
            firebase.updatePreviousTrainingSession(user.uid, userRecord.previousTrainingSessions)

            if (userRecord.activeSchedule.currentSession != schedule.sessies.length) {
                firebase.incrementCurrentScheduleSession(user.uid, userRecord.activeSchedule)
            }

            setAnalyticsData(sessionData)
            setIsAnalyticsModal(true)

        }

    }

    return (
        <View style={[globalStyles.container]}>
            <GeoTrainingModal visible={isGeoModalVisible} routeId={currentRouteId} onClose={closeHandler} isPreview={false} polygon={polygon} markers={markers} />
            <SessionAnalyticsModal isVisible={isAnalyticsModal} data={analyticsData} onClose={() => setIsAnalyticsModal(false)} />
            <Modal isVisible={descriptionModal} useNativeDriver={true}
                swipeDirection={['down']}
                onSwipeComplete={() => setDescriptionModal(false)}
                onBackdropPress={() => setDescriptionModal(false)}
            >
                <View style={{ backgroundColor: Colors.tertiary, borderRadius: 20, padding: 5 }}>
                    <Text>{schedule.beschrijving}</Text>
                </View>
            </Modal>
            <LoadingModal isLoading={isLoading} />

            <View style={styles.headerContainer}>
                <Text style={[globalStyles.headerText, { color: Colors.secondary }]}>{schedule?.titel}</Text>
                <Text style={[globalStyles.bodyText, { color: 'gray' }]}>Op <Text style={{ color: Colors.primary }}>{deadline?.toLocaleDateString('nl-NL')}</Text> is deze trainingsweek afgelopen</Text>
                <Text style={[globalStyles.bodyText, { color: 'gray' }]}>
                    Resterende tijd <Text style={{ color: Colors.primary }}>
                        {Math.round(remainingTime?.getTime() / 1000 / 60 / 60 / 24)}:{remainingTime?.toLocaleTimeString('nl-NL')} </Text>
                    <Text style={[globalStyles.bodyText, { color: Colors.primary }]}>
                        | Week {userRecord?.activeSchedule.currentWeek}/{schedule?.lengte}
                    </Text>
                </Text>
                <Text style={[globalStyles.bodyText, { color: Colors.secondary, fontSize: 14 }]} onPress={() => setDescriptionModal(true)}>Lees meer</Text>
            </View>

            <View style={styles.bodyContainer}>
                <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
                    {schedule.sessies.map((item, index) => (
                        <View key={index} style={[styles.session, userRecord?.activeSchedule.currentSession < index + 1 ? { opacity: 0.5, backgroundColor: 'black' } : null]}>
                            <View style={styles.infoContainer}>
                                <Text style={[globalStyles.headerText, { color: Colors.tertiary }]}>Sessie {index + 1}</Text>
                                <Text style={[globalStyles.headerText, { color: 'gray' }]}>{userRecord?.activeSchedule.trainingsDays.find(day => day.id === item.routeID).option}</Text>
                            </View>
                            <View style={styles.achievementContainer}>
                                <View style={[styles.incentiveContainer, { backgroundColor: 'orange' }]}>
                                    <Text>{item.kwaliteitsCriteria.goud.tijd * 60} minuten</Text>
                                    <Text>+{item.kwaliteitsCriteria.goud.beloning} EXP</Text>
                                </View>
                                <View style={[styles.incentiveContainer, { backgroundColor: 'silver' }]}>
                                    <Text>{item.kwaliteitsCriteria.zilver.tijd * 60} minuten</Text>
                                    <Text>+{item.kwaliteitsCriteria.zilver.beloning} EXP</Text>
                                </View>
                                <View style={[styles.incentiveContainer, { backgroundColor: 'brown' }]}>
                                    <Text style={{ color: Colors.tertiary }}>{item.kwaliteitsCriteria.bronze.tijd * 60} minuten</Text>
                                    <Text style={{ color: Colors.tertiary }}>+{item.kwaliteitsCriteria.bronze.beloning} EXP</Text>
                                </View>
                            </View>
                            <TouchableOpacity style={styles.buttonContainer} disabled={userRecord?.activeSchedule.currentSession < index + 1} onPress={() => openRoutehandler(item.routeID)}>
                                <Text style={[globalStyles.headerText, { color: Colors.secondary }]}>Open Route</Text>
                                <Icon
                                    type='ionicon'
                                    name='ios-pin'
                                    color={Colors.secondary}
                                    size={30}
                                />
                            </TouchableOpacity>
                        </View>
                    ))}

                </ScrollView>
            </View>
        </View>
    )
}

export default SessionScreen

const styles = StyleSheet.create({
    headerContainer: {
        flex: 1.5,
        backgroundColor: Colors.tertiary,
        borderRadius: 20,
        width: '95%',
        shadowColor: 'black',
        shadowOffset: { height: 1, width: 1 },
        shadowOpacity: 0.6,
        shadowRadius: 10,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginVertical: '2.5%'
    },

    bodyContainer: {
        flex: 4,
        backgroundColor: Colors.tertiary,
        borderRadius: 20,
        width: '95%',
        shadowColor: 'black',
        shadowOffset: { height: 4, width: 4 },
        shadowOpacity: 0.6,
        shadowRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '2.5%'
    },

    session: {
        backgroundColor: Colors.secondary,
        borderRadius: 30,
        width: '95%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        height: '40%',

        // marginVertical: '2.5%'
    },

    infoContainer: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'red'
    },

    achievementContainer: {
        flex: 2,
        alignItems: 'center',
        height: '100%',
        justifyContent: 'space-evenly',
        // flexDirection: 'row',
        // width: '100%',
        // backgroundColor: 'blue'
    },

    incentiveContainer: {
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20
    },

    buttonContainer: {
        flex: 1,
        backgroundColor: Colors.tertiary,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        // marginBottom: '5%'
        borderWidth: 1,
        borderColor: Colors.secondary,
        borderTopRightRadius: 30,
        borderBottomRightRadius: 30
    },

    scrollViewContent: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'space-evenly',
    },
})
