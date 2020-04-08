import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Modal, TouchableOpacity, Animated, ScrollView, Alert } from 'react-native';
import MapView, { Polygon, Marker } from 'react-native-maps';
import { globalStyles, Colors, SCREEN_WIDTH } from '../../constants';
import Markers from '../../components/markers';
import WaypointChecklist from '../../components/waypointChecklist';

const GeoTrainingModal = ({ visible, onClose, markers, polygon, isPreview }) => {

    const [map, setMap] = useState(null);

    const [animatedValue] = useState(new Animated.Value(0));
    const [animatedValueMoveX] = useState(new Animated.Value(0));

    const [markerDialog, setMarkerDialog] = useState(false);
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');

    const [waypointChecklist, setWaypointChecklist] = useState([])
    const [isStarted, setIsStarted] = useState(false)
    const [startTime, setStartTime] = useState(null)
    const [timer, setTimer] = useState(null)

    const [testLocation, setTestLocation] = useState({
        latitude: 50.85,
        longitude: 5.9,
    })

    const [userLocation, setUserLocation] = useState(null)

    useEffect(() => {
        if (isStarted) {

            if (waypointChecklist.length == 0) {
                checkWaypoint(0);
            } else {
                for (let i = 0; i < markers.length - 1; i++) {
                    checkWaypoint(i);
                }
            }

            if (waypointChecklist.length == markers.length - 1) {
                checkWaypoint(markers.length - 1)
            } else if (waypointChecklist.length == markers.length) {
                cleanUp(true)
            }
        }
    })

    const checkWaypoint = (index) => {
        let mcoords = {
            lat: markers[index].geometry.coordinates['1'],
            lon: markers[index].geometry.coordinates['0']
        }

        let distance = Math.sqrt(Math.pow(testLocation.latitude - mcoords.lat, 2) + Math.pow(testLocation.longitude - mcoords.lon, 2))
        if (distance < 0.0005 && !waypointChecklist.includes(index)) {
            waypointChecklist.push(index)
        }
    }

    const closeModalHandler = () => {
        if (isStarted) {
            Alert.alert(
                "Weet je het zeker?",
                "Je al begonnen aan deze route. Als je OK klikt dan zal je de volgende keer opnieuw moeten beginnen!",
                [
                    { text: "OK", onPress: () => cleanUp(false) },
                    { text: "Annuleren", style: 'cancel' },
                ])
        } else {
            cleanUp(false)
        }
    }

    const cleanUp = (completed) => {
        setIsStarted(false)
        setWaypointChecklist([])
        onClose(isStarted, waypointChecklist, startTime, new Date(), completed);
    }

    const startHandler = () => {
        Animated.timing(animatedValueMoveX, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true
        }).start();
        setStartTime(new Date());
        let t = new Date();
        t.setHours(0, 0, 0, 0);
        setTimer(t);
        setIsStarted(true);
    }

    const stopHandler = () => {
        Alert.alert(
            "Weet je het zeker?",
            "Je al begonnen aan deze route. Als je OK klikt dan zal je de volgende keer opnieuw moeten beginnen!",
            [
                { text: "OK", onPress: () => cleanUp(false) },
                { text: "Annuleren", style: 'cancel' },
            ])
    }

    const calcTimer = () => {
        if (timer) {
            timer.setSeconds(timer.getSeconds() + 1)
        }
        return timer ? `${timer.getHours()}:${timer.getMinutes()}` : null
    }

    const translateDialogComponents = {
        transform: [
            {
                translateY: animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0%', '-250%']
                })
            }
        ]
    }

    const translateButton = {
        transform: [
            {
                translateY: animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0%', '-250%']
                })
            },
            {
                translateX: animatedValueMoveX.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, SCREEN_WIDTH]
                })
            }
        ]
    }

    return (
        <Modal visible={visible} animationType='slide'>
            <View style={{ flex: 1 }}>
                <MapView
                    ref={map => setMap(map)}
                    style={{ flex: 1 }}
                    loadingEnabled={true}
                    showsCompass={false}
                    showsUserLocation={!isPreview}
                    onUserLocationChange={(e) => console.log(e.nativeEvent.coordinate)}
                    onMapReady={() => map.fitToElements(true)}
                    onPress={() => {
                        if (markerDialog) {
                            Animated.timing(animatedValue, {
                                toValue: 0,
                                duration: 200,
                                useNativeDriver: true
                            }).start()
                            setMarkerDialog(false)
                        }
                    }}
                >
                    <Polygon coordinates={polygon} strokeWidth={2} strokeColor={'red'} />
                    <Markers markers={markers} onPress={marker => {
                        setTitle(marker.properties.name)
                        setDescription(marker.properties.description)
                        setMarkerDialog(true)
                        Animated.timing(animatedValue, {
                            toValue: 1,
                            duration: 200,
                            useNativeDriver: true
                        }).start()
                    }} />

                    <Marker draggable onDrag={e => setTestLocation(e.nativeEvent.coordinate)} coordinate={testLocation} pinColor='purple' />
                </MapView>

                <TouchableOpacity style={[styles.button, styles.closeButton]} onPress={closeModalHandler}>
                    <Text style={[globalStyles.headerText, { color: Colors.secondary }]}>Sluiten</Text>
                </TouchableOpacity>

                {!isPreview &&
                    <Animated.View style={[styles.startButton, translateButton]}>
                        <TouchableOpacity style={[styles.button]} onPress={startHandler}>
                            <Text style={[globalStyles.headerText, { color: Colors.secondary }]}>Start</Text>
                        </TouchableOpacity>
                    </Animated.View>}

                {!isPreview &&
                    <Animated.View style={[styles.stopButton, translateButton]}>
                        <TouchableOpacity style={[styles.button]} onPress={stopHandler}>
                            <Text style={[globalStyles.headerText, { color: Colors.secondary }]}>Stop</Text>
                        </TouchableOpacity>
                    </Animated.View>}

                {!isPreview &&
                    <Animated.View style={[styles.timerContainer, {
                        transform: [
                            {
                                translateX: animatedValueMoveX.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, SCREEN_WIDTH]
                                })
                            }
                        ]
                    }]}>
                        <Text style={[globalStyles.headerText]}>Timer: {calcTimer()}</Text>
                    </Animated.View>}

                <Animated.View style={[styles.animatedContainer, translateDialogComponents]}>
                    <ScrollView contentContainerStyle={{
                        paddingHorizontal: 10,
                        paddingTop: 10
                    }}>
                        <Text style={[globalStyles.headerText, { textAlign: 'center' }]}>{title}</Text>
                        <Text style={{ textAlign: 'center' }}>{description}</Text>
                        <View style={{ height: 150 }}></View>
                    </ScrollView>
                </Animated.View>

                <WaypointChecklist positionStyle={styles.checklist} markers={markers} checked={waypointChecklist} />
            </View>
        </Modal>
    )
}

export default GeoTrainingModal

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: Colors.secondary
    },

    closeButton: {
        position: 'absolute',
        top: '3%',
        right: '5%',
        width: '30%',
        height: '10%',

    },

    startButton: {
        position: 'absolute',
        bottom: '3%',
        right: '40%',
        width: '20%',
        height: '10%',
    },

    stopButton: {
        position: 'absolute',
        bottom: '3%',
        right: '140%',
        width: '20%',
        height: '10%',
    },

    timerContainer: {
        position: 'absolute',
        top: '5%',
        right: '130%',
        width: '50%',
        height: '10%',
    },

    animatedContainer: {
        position: 'absolute',
        bottom: '-60%',
        backgroundColor: 'white',
        width: '100%',
        height: '60%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        shadowColor: 'black',
        shadowOpacity: 0.3,
        shadowOffset: { height: 2, width: 4 },
        shadowRadius: 40,

    },

    checklist: {
        position: 'absolute',
        left: '1%',
        top: '3%'
    }
})
