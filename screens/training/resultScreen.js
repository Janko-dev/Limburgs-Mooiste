import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { globalStyles, Colors } from '../../constants'

const ResultScreen = ({ data, onClose, session }) => {

    const [earnedExp, setEarnedExp] = useState(0)
    const [medal, setMedal] = useState('nvt');

    useEffect(() => {
        if (data) {
            let earnedExp = 0;
            if (data.isCompleted) {
                earnedExp += 15
                let time = Math.abs(data.stopTime - data.startTime) / 1000 / 60 / 60
                let criteria = session.kwaliteitsCriteria;
                if (time < criteria.goud.tijd) {
                    earnedExp += criteria.goud.beloning;
                    setMedal("gold")
                } else if (time < criteria.zilver.tijd) {
                    earnedExp += criteria.zilver.beloning
                    setMedal("silver")
                } else if (time < criteria.bronze.tijd) {
                    earnedExp += criteria.bronze.beloning
                    setMedal("bronze")
                }
            }

            earnedExp += 5 * data.waypointReached;

            setEarnedExp(earnedExp)

        }
    }, [data])

    const closeHandler = () => {

        let trainingSessionData = {
            ...data,
            earnedExp,
            medal
        }

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
            </View>

            <TouchableOpacity style={styles.button} onPress={closeHandler}>
                <Text style={[globalStyles.headerText, { color: Colors.tertiary}]}>Sluiten</Text>
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
        // marginTop: '20%'
    },

    header: {

    },

    body: {
        marginVertical: 60,
        // justifyContent: 'center',
        // alignItems: 'center',
    }
})
