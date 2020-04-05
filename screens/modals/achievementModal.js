import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import Modal from 'react-native-modal';
import { Icon } from 'react-native-elements';
import { Colors, SCREEN_HEIGHT } from '../../constants';
import ConfettiCannon from 'react-native-confetti-cannon';


const AchievementModal = ({ isVisible, onClose, children, onModalShow }) => {

    const [shoot, setShoot] = useState(false);


    return (
        <Modal isVisible={isVisible} useNativeDriver={true} 
        onModalShow={() => {
            setShoot(true);
            onModalShow();
        }}>
            <View style={{ height: '60%' }}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={onClose} style={styles.button}>
                        <Icon
                            type='ionicon'
                            name='ios-close-circle-outline'
                            color={Colors.secondary}
                            size={50}
                        />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 3, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center'}}>
                    {children}
                </View>

            </View>
            {shoot ? <ConfettiCannon count={100} fadeOut={true} explosionSpeed={200} origin={{ x: 0, y: 0 }} colors={[Colors.primary, Colors.secondary, Colors.tertiary]} /> : null}
        </Modal>
    )
}

export default AchievementModal

const styles = StyleSheet.create({

    buttonContainer: {
        width: '100%',
        flex: 0.5,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },

    button: {
        right: '5%'
    }
})
