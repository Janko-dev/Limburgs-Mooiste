import React from 'react';
import { Modal, StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { globalStyles, Colors } from '../../constants'; 

const ProgressionModal = ({ visible, onClose }) => {

    return (
        <Modal animationType='slide' visible={visible} >
            <View style={styles.modal}>
                <TouchableOpacity onPress={onClose} style={styles.button}>
                    <Text style={[globalStyles.fontStyle, styles.buttonText]} >Sluiten</Text>
                </TouchableOpacity>

                
            </View>
        </Modal>
    )
}


const styles = StyleSheet.create({
    modal: {
        alignItems: 'center',
        flex: 1
    },

    button: {
        width: '90%',
        height: '10%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '5%',
        borderRadius: 10,
        backgroundColor: Colors.primary,
    },

    buttonText: {
        fontSize: 24,
        color: Colors.tertiary
    }
})

export default ProgressionModal;