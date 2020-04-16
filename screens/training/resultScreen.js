import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from 'react-native'
import { globalStyles, Colors, SCREEN_WIDTH, SCREEN_HEIGHT } from '../../constants';
import firebase from '../../api/firebase'

const ResultScreen = ({ data, onClose, session, userData }) => {

    const [earnedExp, setEarnedExp] = useState(0)
    const [medal, setMedal] = useState('geen');
    const [newAchievements, setNewAchievements] = useState([]);

    useEffect(() => {
        if (data) {
            let routeExp = 0;
            let medal = 'geen'
            if (data.isCompleted) {
                routeExp += 15
                let time = Math.abs(data.stopTime - data.startTime) / 1000 / 60 / 60
                let criteria = session.kwaliteitsCriteria;
                if (time < criteria.goud.tijd) {
                    routeExp += criteria.goud.beloning;
                    medal = "gold"
                } else if (time < criteria.zilver.tijd) {
                    routeExp += criteria.zilver.beloning
                    medal = "silver"
                } else if (time < criteria.bronze.tijd) {
                    routeExp += criteria.bronze.beloning
                    medal = "bronze"
                }
            }

            routeExp += 5 * data.waypointReached;
            // let exp = earnedExp;
            if (userData) {
                firebase.getAchievementsByType('Snelheid').then(data => {
                    let achievements = data.docs.map(item => {
                        return { ...item.data(), id: item.id }
                    })

                    let medals = getMedals();
                    if (medal === 'gold') medals += 3;
                    if (medal === "silver") count += 2;
                    if (medal === "bronze") count += 1;

                    let newAchievs = []
                    achievements.forEach(item => {
                        if (medals >= item.criterium && !userData.achievements.includes(item.id)) {
                            newAchievs.push(item)
                        }
                    })

                    let newAchievsIds = newAchievs.map(item => item.id)
                    if (newAchievsIds.some(item => !userData.achievements.includes(item))) {
                        firebase.setUserAchievement(userData.achievements, newAchievsIds)
                    }
                    if (newAchievs.length != 0) {
                        setNewAchievements(newAchievs)
                        newAchievs.forEach(item => routeExp += item.beloning)
                        setEarnedExp(routeExp)
                    }
                })
            }

            setEarnedExp(routeExp);
            setMedal(medal);
        }
    }, [data])

    const getMedals = () => {
        let _prevTraining = userData.previousTrainingSessions;
        let count = 0;

        _prevTraining.forEach(item => {
            if (item?.medal == "gold") count += 3;
            if (item?.medal == "silver") count += 2;
            if (item?.medal == "bronze") count += 1;
        })

        return count;
    }

    const closeHandler = () => {

        let trainingSessionData = {
            ...data,
            earnedExp,
            medal
        }

        setNewAchievements([])

        onClose(trainingSessionData)
    }


    return (
        <View style={[globalStyles.container, styles.container]}>
            <View style={styles.header}>
                <Text style={[globalStyles.headerText, { color: Colors.secondary, fontSize: 35 }]}>Resultaten</Text>
            </View>

            <View style={styles.body}>
                <Text style={[globalStyles.headerText, { color: 'black' }]}>Aantal waypoints afgevinkt: {data?.waypointReached}/{data?.totalWaypoints}</Text>
                <Text style={[globalStyles.headerText, { color: 'black' }]}>Start tijd: {data?.startTime?.toLocaleString()}</Text>
                <Text style={[globalStyles.headerText, { color: 'black' }]}>Stop tijd: {data?.stopTime?.toLocaleString()}</Text>
                <Text style={[globalStyles.headerText, { color: 'black' }]}>Behaalde medaille: {medal}</Text>
                <Text style={[globalStyles.headerText, { color: 'black' }]}>Totaal exp verdiend: +{earnedExp}</Text>
                {newAchievements.length != 0 &&
                    <View style={styles.newAchievementContainer}>
                        <Text style={[globalStyles.headerText, { color: 'black' }]}>Behaalde Achievements!</Text>
                        <ScrollView horizontal={true} style={{ width: '100%', marginTop: 10 }}>
                            {newAchievements.map((item, index) =>
                                <View key={index.toString()} style={styles.newAchievement}>
                                    <Image source={{ uri: item.badge }} style={{ width: '70%', height: '50%' }} />
                                    <Text style={[globalStyles.headerText, { fontSize: 18 }]}>{item.naam}</Text>
                                    <Text style={[globalStyles.headerText, { fontSize: 14 }]}>{item.beschrijving}</Text>
                                    <Text style={[globalStyles.headerText, { fontSize: 14, color: 'white' }]}>+{item.beloning} exp</Text>
                                </View>
                            )}
                        </ScrollView>
                    </View>}

            </View>

            <TouchableOpacity style={styles.button} onPress={closeHandler}>
                <Text style={[globalStyles.headerText, { color: 'white' }]}>Sluiten</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ResultScreen

const styles = StyleSheet.create({
    container: {
    },

    button: {
        backgroundColor: Colors.primary,
        height: '10%',
        width: '40%',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },

    header: {

    },

    newAchievementContainer: {
        height: SCREEN_HEIGHT * 0.45,
        marginVertical: '5%',
        // backgroundColor: 'red',
        width: SCREEN_WIDTH * 0.8,
    },

    newAchievement: {
        backgroundColor: Colors.primary,
        borderRadius: 20,
        height: SCREEN_HEIGHT * 0.35,
        width: SCREEN_WIDTH * 0.6,
        marginHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },

    body: {
        marginVertical: 10,
        // justifyContent: 'center',
        // alignItems: 'center',
    }
})
