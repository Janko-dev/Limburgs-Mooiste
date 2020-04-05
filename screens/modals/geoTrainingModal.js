import React, { useState } from 'react'
import { StyleSheet, Text, View, Modal, TouchableOpacity, Animated, ScrollView } from 'react-native';
import MapView, { Polygon } from 'react-native-maps';
import { globalStyles, Colors } from '../../constants';
import Markers from '../../components/markers';
import DescriptionModal from 'react-native-modal';

const GeoTrainingModal = ({ visible, onClose, markers, polygon, isPreview }) => {

    const [map, setMap] = useState(null);
    // const [animatedValue] = useState(new Animated.Value(0));
    const [isVisible, setIsVisible] = useState(false);
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');

    const startHandler = () => {
        // Animated.timing(animatedValue, {
        //     toValue: 1,
        //     duration: 500,
        //     useNativeDriver: true
        // }).start()
        setIsVisible(true)
    }

    return (
        <Modal visible={visible} animationType='slide'>
            <View style={{ flex: 1 }}>
                <MapView
                    // provider={'google'}
                    ref={map => setMap(map)}
                    style={{ flex: 1 }}
                    loadingEnabled={true}
                    // showsUserLocation={true}
                    onMapReady={() => map.fitToElements(true)}
                >
                    <Polygon coordinates={polygon} strokeWidth={2} strokeColor={'red'} />
                    <Markers markers={markers} onPress={marker => {
                        setTitle(marker.properties.name)
                        setDescription(marker.properties.description)
                        setIsVisible(true);
                    }} />
                </MapView>

                <DescriptionModal
                    isVisible={isVisible}
                    onBackdropPress={() => setIsVisible(false)}
                    backdropOpacity={0}
                    // onSwipeComplete={() => setIsVisible(false)}
                    // swipeDirection={['up', 'left', 'right', 'down']}
                    style={styles.descriptionModal}
                    useNativeDriver={true}
                >
                    <View style={styles.descriptionContainer}>
                        <ScrollView contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}>
                            <Text>{title}</Text>
                            <Text>{description}</Text>
                        </ScrollView>
                    </View>
                </DescriptionModal>

                <TouchableOpacity style={[styles.button, styles.closeButton]} onPress={() => onClose()}>
                    <Text style={[globalStyles.headerText, { color: Colors.secondary }]}>Sluiten</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.button, styles.startButton]} onPress={startHandler}>
                    <Text style={[globalStyles.headerText, { color: Colors.secondary }]}>start</Text>
                </TouchableOpacity>

                {/* <Animated.View style={[styles.animatedContainer, {

                    transform: [{
                        translateY: animatedValue.interpolate({
                            inputRange: [0, 1],
                            outputRange: ['0%', '-100%']
                        })
                    }]
                }]}>
                    <Text>test</Text>
                </Animated.View> */}
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
        right: '15%',
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

    animatedContainer: {
        position: 'absolute',
        bottom: '-20%',
        // right: '40%',
        backgroundColor: 'red',
        width: '100%',
        height: '20%'
    },

    descriptionModal: {
        justifyContent: 'flex-end',
        margin: 0,
    },

    descriptionContainer: {
        backgroundColor: 'white',
        height: '30%',
        width: '100%',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        shadowColor: 'black',
        shadowOpacity: 0.6,
        shadowOffset: { height: 2, width: 4 },
        shadowRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        // flex: 1
    }

})
