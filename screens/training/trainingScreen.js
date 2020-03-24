import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Colors } from '../../constants';

import firebase from '../../api/firebase';
import CardBoxContainer from '../../components/cardBoxContainer';

const TrainingScreen = ({ navigation }) => {

    const [user, setUser] = useState(firebase.getCurrentUser())
    const [userRecord, setUserRecord] = useState(null);
    const [schedules, setSchedules] = useState(null);

    useEffect(() => {
        if (user){
            firebase.getUserFromDB(user.uid).then(userDoc => {
                setUserRecord(userDoc.data());
            })
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
        // console.log(navigation)
        navigation.navigate("Sessions", { activeSchedule: userRecord.activeSchedule });
    }

    const isActiveSchedulePresent = () => {
        if (userRecord && userRecord.activeSchedule) {
            return (
                <TouchableOpacity onPress={navigateActiveSchedule} style={styles.activeScheduleContainer}>
                    <Text>Actief Schema</Text>
                </TouchableOpacity>
            )
        }
    }

    return (
        <View style={styles.container}>

            {isActiveSchedulePresent()}

            <View style={styles.schedulesContainer}>
                {/* {schedules ? schedules.map((item, index) => (
                    <Text key={index}>{item.beschrijving}</Text>
                )) : null} */}

                <FlatList
                    data={schedules ? schedules : null}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) =>
                        <CardBoxContainer
                            onPress={() => { }}
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
        backgroundColor: Colors.primary,
        borderRadius: 10
    }
});

export default TrainingScreen