import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Animated, TouchableOpacity } from 'react-native'
import { Colors, globalStyles } from '../constants'
import { Icon, Overlay } from 'react-native-elements'
import Utils from '../api/utils';
import GeoTrainingModal from '../screens/modals/geoTrainingModal';
import OptionPicker from "../components/optionPicker";

import Modal from 'react-native-modal';

const SessionInfoContainer = ({ style, session, route, onSelectTrainingsDay }) => {

    const [animatedValue] = useState(new Animated.Value(0));
    const [markers, setMarkers] = useState(null);
    const [polygon, setPolygon] = useState(null);
    const [routeName, setRouteName] = useState(null);
    const [isGeoModalVisible, setIsGeoModalVisible] = useState(false)
    const [isTrainingModal, setIsTrainingModal] = useState(false)
    const [trainingsDay, setTrainingsDay] = useState(null)
    const days = ['Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag', 'Zondag']

    useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true
        }).start();
    }, [])

    useEffect(() => {
        if (route) {
            setMarkers(() => Utils.getMarkersFromRoute(route))
            setPolygon(() => Utils.getPolygonFromRoute(route))
            setRouteName(() => Utils.getNameFromRoute(route))
        }
    }, [route])

    const animationStyles = {
        // opacity: animatedValue,
        transform: [
            {
                translateX: animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0%', '100%'],
                    // extrapolate: 'clamp'
                })
            }
        ]
    }

    return (
        <Animated.View style={[styles.session, style, animationStyles]}>
            <GeoTrainingModal visible={isGeoModalVisible} isPreview={true} userData={null} session={session} routeId={session.routeId} onClose={() => setIsGeoModalVisible(false)} polygon={polygon} markers={markers} />

            <Modal isVisible={isTrainingModal}
                useNativeDriver={true}
                swipeDirection={['down']}
                onSwipeComplete={() => setIsTrainingModal(false)}
                onBackdropPress={() => setIsTrainingModal(false)}
            >
                <OptionPicker
                    options={days}
                    title="Kies een geschikte trainingsdag voor deze route"
                    // containerStyle={styles.optionPickerContainer}
                    optionStyle={{height: 50, width: 200}}
                    textStyle={{ color: Colors.tertiary }}
                    onSelect={(option) => {
                        setTrainingsDay(option);
                        setIsTrainingModal(false);
                        onSelectTrainingsDay({option, id: session.routeID});
                    }}
                />
            </Modal>

            <View style={styles.headerContainer}>
                <Text style={[globalStyles.headerText, styles.textStyle]}>{routeName}</Text>
            </View>

            <View style={styles.performanceContainer}>
                <Text style={[globalStyles.bodyText, { fontSize: 15, color: Colors.secondary }]}>Kwaliteitscriteria:</Text>
                <Text style={[globalStyles.bodyText, { fontSize: 15, color: Colors.tertiary, width: '90%' }]}>Rij deze route binnen een bepaalde tijd om een bonus en achievement te verdienen!</Text>
                <View style={styles.achievementContainer}>
                    <View style={[styles.incentiveContainer, { backgroundColor: 'orange' }]}>
                        <Text>{session.kwaliteitsCriteria.goud.tijd * 60} minuten</Text>
                        <Text>+{session.kwaliteitsCriteria.goud.beloning} EXP</Text>
                    </View>
                    <View style={[styles.incentiveContainer, { backgroundColor: 'silver' }]}>
                        <Text>{session.kwaliteitsCriteria.zilver.tijd * 60} minuten</Text>
                        <Text>+{session.kwaliteitsCriteria.zilver.beloning} EXP</Text>
                    </View>
                    <View style={[styles.incentiveContainer, { backgroundColor: 'brown' }]}>
                        <Text style={styles.textStyle}>{session.kwaliteitsCriteria.bronze.tijd * 60} minuten</Text>
                        <Text style={styles.textStyle}>+{session.kwaliteitsCriteria.bronze.beloning} EXP</Text>
                    </View>
                </View>
            </View>

            <View style={styles.buttonGroup}>
                <TouchableOpacity onPress={() => setIsTrainingModal(true)} style={[styles.optionPickerButton, trainingsDay ? {borderColor: Colors.success, borderWidth: 3} : Colors.tertiary]}>
                    <Text style={[globalStyles.headerText, { color: Colors.secondary, fontSize: 15 }]}>{trainingsDay ? trainingsDay : "Trainingsdag"}</Text>
                    <Icon
                        type='ionicon'
                        name='ios-arrow-down'
                        color={Colors.secondary}
                        size={30}
                    />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setIsGeoModalVisible(true)} style={styles.button}>
                    <Text style={[globalStyles.headerText, { color: Colors.secondary, fontSize: 15 }]}>Bekijk route</Text>
                    <Icon
                        type='ionicon'
                        name='ios-pin'
                        color={Colors.secondary}
                        size={30}
                    />
                </TouchableOpacity>
            </View>


            {/* <OptionPicker
                title="Kies een geschikte trainingsdag voor deze route"
                options={days}
                containerStyle={styles.optionPickerContainer}
                optionStyle={styles.option}
                textStyle={{fontSize: 16}}
                onSelect={(option) => console.log(option)}
            /> */}
        </Animated.View>
    )
}

export default SessionInfoContainer

const styles = StyleSheet.create({
    session: {
        backgroundColor: Colors.secondary,
        marginVertical: 10,
        width: '100%',
        height: 300,
        left: -100,
        flex: 1,
        borderRadius: 10,
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },

    textStyle: {
        color: Colors.tertiary
    },

    headerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonGroup: {
        flex: 1,
        flexDirection: 'row',
        // padding: '5%',
        justifyContent: 'space-evenly'
    },

    button: {
        // width: 200,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderRadius: 10,
        flex: 1,
        margin: '2.5%',
        backgroundColor: Colors.tertiary
    },

    achievementContainer: {
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
        width: '100%',
    },

    performanceContainer: {
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: '95%',
        borderRadius: 10,
        flex: 2
    },

    incentiveContainer: {
        width: '30%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20
    },

    optionPickerButton: {
        margin: '2.5%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        backgroundColor: Colors.tertiary,
        borderRadius: 10,
    }

})
