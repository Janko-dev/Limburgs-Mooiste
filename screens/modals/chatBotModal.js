import React from 'react';
import { Modal, StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { globalStyles, Colors } from '../../constants'; 

const ChatBotModal = ({ visible, onClose}) => {

    return (
        <Modal animationType='slide' visible={visible}  >
            <View style={{alignItems: 'center', justifyContent: 'center', height: '100%'}}>
                <Text>Ik word een chatbot</Text>
                <TouchableOpacity onPress={onClose}>
                    <Text style={{color: Colors.primary}}>Sluiten</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    )
}

export default ChatBotModal