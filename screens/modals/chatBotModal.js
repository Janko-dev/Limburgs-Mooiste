import React from 'react';
import { Modal, StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { globalStyles, Colors } from '../../constants'; 
import ChatBot from 'react-native-chatbot-expo';

const ChatBotModal = ({ visible, onClose}) => {

    const steps = [
        {
          id: '0',
          message: 'Welcome to react chatbot!',
          trigger: '1',
        },
        {
          id: '1',
          message: 'Bye!',
          end: true,
        },
      ];

    return (
        <Modal animationType='slide' visible={visible}  >
            <View style={{alignItems: 'center', justifyContent: 'center', height: '100%', flex: 1}}>
                <ChatBot steps={steps} />


            </View>
            <View style={{flex: 2}}>
                <TouchableOpacity onPress={onClose}>
                    <Text style={{color: Colors.primary}}>Sluiten</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    )
}

export default ChatBotModal