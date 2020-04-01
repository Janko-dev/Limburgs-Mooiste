import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Animated, TouchableOpacity, Alert } from 'react-native'
import { globalStyles, Colors } from '../../constants'
import firebase from '../../api/firebase';
import LoadingModal from '../modals/loadingModal';
import SessionContainer from '../../components/sessionInfoContainer';

const ScheduleDetailsScreen = ({ route, navigation }) => {

    const [scrollAnimatedvalue] = useState(new Animated.Value(0))
    const [isLoading, setIsLoading] = useState(true)
    const [geoData, setGeoData] = useState(null);
    const [isStartable, setIsStartable] = useState(false)
    const [trainingDays, setTrainingsDays] = useState(
        route.params.sessies.map(item => {
            return { option: null, id: item.routeID }
        }));

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

    const startButtonHandler = () => {
        if (route.params.hasSchedule) {
            Alert.alert(
                "Weet je het zeker?",
                "Je bent al gestart met een schema. Dit schema zal overschreven worden!",
                [
                    { text: 'Annuleren', style: 'cancel' },
                    { text: 'OK', onPress: () => startSchedule() },
                ])
        } else {
            startSchedule()
        }
    }

    const startSchedule = () => {
        setIsLoading(true)
        firebase.setActiveSchedule(route.params.uid, route.params.id, trainingDays)
            .then(() => {
                setIsLoading(false)
                navigation.navigate("Sessions", { ...route.params })
            });
    }

    const selectTrainingsDayHandler = (option) => {
        trainingDays.forEach((item, index) => {
            if (option.id === item.id) {
                trainingDays[index] = option
            }
        })

        if (trainingDays.filter(item => item.option == null).length == 0){
            setIsStartable(true);
        }
        setTrainingsDays(trainingDays);
    }

    return (
        <View style={[globalStyles.container, styles.container]}>

            <LoadingModal isLoading={isLoading} />

            <View style={styles.bodyContainer}>
                <Animated.ScrollView contentContainerStyle={styles.scrollView}
                    showsVerticalScrollIndicator={false}
                    onScroll={Animated.event(
                        [
                            {
                                nativeEvent: { contentOffset: { y: scrollAnimatedvalue } }
                            }
                        ],
                        { useNativeDriver: true }
                    )} scrollEventThrottle={16}>

                    <Text style={[globalStyles.headerText, styles.headerText, { marginVertical: 10 }]}>{route.params.titel}</Text>
                    <Text style={[globalStyles.bodyText, styles.bodyText]}>{route.params.beschrijving}</Text>

                    {!isLoading &&
                        <View style={styles.sessionContainer}>
                            {route.params.sessies.map((item, index) => (
                                <SessionContainer key={index} session={item} onSelectTrainingsDay={selectTrainingsDayHandler} route={geoData ? geoData[item.routeID] : null} />
                            ))}
                        </View>}

                </Animated.ScrollView>
            </View>

            <Animated.View style={[styles.headerContainer, {
                transform: [
                    {
                        translateY: scrollAnimatedvalue.interpolate({
                            inputRange: [20, 40],
                            outputRange: [0, 50],
                            extrapolate: 'clamp'
                        })
                    }
                ]
            }]}>
                <Text style={[globalStyles.headerText, styles.headerText]}>{route.params.titel}</Text>
            </Animated.View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.button, {backgroundColor: isStartable ? Colors.success : 'gray' }]} disabled={!isStartable} onPress={startButtonHandler}>
                    <Text style={[globalStyles.headerText, styles.headerText]}>Starten</Text>
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
        shadowOpacity: 0.2,
        shadowRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: -50,
        height: 50
    },

    headerText: {
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
        // backgroundColor: 'red',
        width: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: '10%',
        marginBottom: 100
    },

    session: {
        backgroundColor: Colors.secondary,
        marginVertical: 10,
        width: '100%',
        height: 200,
        left: -100,
        borderRadius: 10,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

})
