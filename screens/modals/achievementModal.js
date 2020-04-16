import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, Modal } from 'react-native'
// import Modal from 'react-native-modal';
import { Colors, SCREEN_HEIGHT, SCREEN_WIDTH, globalStyles } from '../../constants';
import ConfettiCannon from 'react-native-confetti-cannon';


const AchievementModal = ({ isVisible, onClose, children, onModalShow }) => {

    const [shoot, setShoot] = useState(false);


    return (
        <Modal visible={isVisible}
            onShow={() => {
                setShoot(true);
                onModalShow();
            }}
            animationType='slide'
            transparent={true}
        >
            {/* <View style={{height: SCREEN_HEIGHT * 0.4, width: SCREEN_WIDTH * 0.9, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', opacity: '100%', borderRadius: "10%"}}>

                <View style={{ flex: 12, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' , borderRadius: "10%"}}>
                    {children}
                </View>
                <View style={{flex: 2, justifyContent: 'center', alignItems: 'center', width: '100%', }}>
                        <TouchableOpacity activeOpacity={0.9} onPress={onClose} style={{borderBottomStartRadius: "10%", borderBottomEndRadius: "10%", width: SCREEN_WIDTH * 0.9, flex: 1, backgroundColor: Colors.tertiary, justifyContent: 'center', alignItems: 'center', borderColor: 'lightgray', borderWidth: 0.25}}>
                            <Text style={{color: 'black', fontSize: SCREEN_HEIGHT * 0.016, fontWeight: '300'}}>Oké</Text>
                        </TouchableOpacity>
                </View>

            </View> */}
            <View style={styles.container}>
                <View style={styles.childrenContainer}>
                    {children}
                </View>

                <TouchableOpacity style={styles.buttonContainer} onPress={onClose}>
                    <Text style={[globalStyles.headerText, { color: 'black' }]}>Oké</Text>
                </TouchableOpacity>
            </View>

            {shoot ? <ConfettiCannon count={100} fadeOut={true} explosionSpeed={200} origin={{ x: 0, y: 0 }} colors={[Colors.primary, Colors.secondary, Colors.tertiary]} /> : null}
        </Modal>
    )
}

export default AchievementModal

const styles = StyleSheet.create({

    buttonContainer: {
        width: '70%',
        height: '20%',
        backgroundColor: Colors.tertiary,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },

    childrenContainer: {
        // marginBottom: '20%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    button: {
        right: '5%'
    },

    container: {
        height: '80%',
        backgroundColor: 'white',
        marginTop: '20%',
        borderRadius: 20,
        shadowColor: 'black',
        shadowOffset: { height: 2, width: 4 },
        shadowOpacity: 0.6,
        shadowRadius: 20,
        width: '95%',
        left: '2.5%',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
})
