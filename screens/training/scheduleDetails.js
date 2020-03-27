import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ScrollView, Animated, TouchableOpacity, Alert, Modal, ActivityIndicator } from 'react-native'
import { globalStyles, Colors } from '../../constants'
import firebase from '../../api/firebase';
import LoadingModal from '../modals/loadingModal';

import { Dialogflow_V2 } from "react-native-dialogflow";

const ScheduleDetailsScreen = ({ route, navigation }) => {

    const [animValue] = useState(new Animated.Value(0))
    const [isLoading, setIsLoading] = useState(false)

    const startButtonHandler = () => {
        if (route.params.hasSchedule) {
            Alert.alert(
                "Weet je het zeker",
                "Je bent al gestart met een schema. Dit schema zal overschreven worden!",
                [
                    { text: 'Annuleren', style: 'cancel' },
                    {
                        text: 'OK', onPress: () => {
                            setIsLoading(true)
                            firebase.setActiveSchedule(route.params.uid, route.params.id)
                                .then(() => {
                                    setIsLoading(false)
                                    navigation.navigate("Sessions", { ...route.params })
                                });

                        }
                    },
                ])
        } else {
            setIsLoading(true)
            firebase.setActiveSchedule(route.params.uid, route.params.id)
                .then(() => {
                    setIsLoading(false)
                    navigation.navigate("Sessions", { ...route.params })
                });
        }

    }

    return (
        <View style={[globalStyles.container, styles.container]}>

            <LoadingModal isLoading={isLoading} />

            <View style={styles.bodyContainer}>
                <ScrollView contentContainerStyle={styles.scrollView}
                    onScroll={Animated.event(
                        [
                            {
                                nativeEvent: { contentOffset: { y: animValue } }
                            }
                        ]
                    )} scrollEventThrottle={16}>

                    <Text style={[globalStyles.fontStyle, styles.headerText, { marginVertical: 10 }]}>{route.params.titel}</Text>
                    <Text style={[globalStyles.fontStyle, styles.bodyText]}>{route.params.beschrijving}</Text>

                    <View style={styles.sessionContainer}>
                        {route.params.sessies.map((item, index) => (
                            <View key={index} style={styles.session}>
                                <Text>{item.routeID}</Text>
                            </View>
                        ))}
                    </View>

                    <View style={styles.selectionContainer}>

                    </View>
                </ScrollView>
            </View>

            <Animated.View style={[styles.headerContainer, {
                height: animValue.interpolate({
                    inputRange: [0, 33],
                    outputRange: [0, 50],
                    extrapolate: 'clamp',
                })
            }]}>
                <Text style={[globalStyles.fontStyle, styles.headerText]}>{route.params.titel}</Text>
            </Animated.View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={startButtonHandler}>
                    <Text style={[globalStyles.fontStyle, styles.headerText]}>Starten</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default ScheduleDetailsScreen

const styles = StyleSheet.create({

    container: {
        backgroundColor: Colors.tertiary
    },

    headerContainer: {
        backgroundColor: Colors.primary,
        width: '95%',
        flex: 1,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        elevation: 10,
        shadowColor: 'black',
        shadowOffset: { width: 8, height: 9 },
        shadowOpacity: 0.7,
        shadowRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        height: 0
    },

    headerText: {
        fontSize: 20,
        color: Colors.secondary
    },

    bodyContainer: {
        backgroundColor: Colors.tertiary,
        flex: 8,
        width: '95%',
    },

    bodyText: {
        color: 'black',
        marginTop: 20,
        textAlign: "center"
    },

    scrollView: {
        alignItems: 'center'
    },

    buttonContainer: {
        width: '70%',
        position: 'absolute',
        bottom: 10,
        height: '10%',
        borderRadius: 20
    },

    button: {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.success,
        borderRadius: 20
    },

    sessionContainer: {
        backgroundColor: 'red',
        width: '95%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: '10%'
    },

    session: {
        backgroundColor: 'orange',
        marginVertical: 10,
        width: '100%',
        height: 100
        // height: '90%'
    },

    selectionContainer: {


    }

})
