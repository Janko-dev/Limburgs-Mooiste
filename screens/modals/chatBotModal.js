import React from 'react';
import { Modal, StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { globalStyles, Colors } from '../../constants';
import ChatBot from 'react-native-chatbot-expo';

const ChatBotModal = ({ visible, onClose }) => {

    const steps = [
        {
            id: '0',
            message: 'Welkom bij Limburgs Mooiste!',
            trigger: '1',
        },
        {
            id: '1',
            message: 'Waar kan ik u mee van dienst zijn?',
            trigger: '2',
        },

        {
            id: '2',
            user: true,
            trigger: '55'
        },

        {
            id: '55',
            message: 'Laat me ff denken....',
            trigger: ({ value, steps }) => {
                if (steps['2']['message'].includes('Limburg')) {
                    return '3'
                } else {
                    return '4'
                }
            }
        },

        {
            id: '3',
            message: 'Limburgs Mooiste is een fietsevenement voor wielerliefhebbers dat elk jaar in het weekend na Pinksteren in de Limburgse heuvels wordt gehouden. De tocht wordt georganiseerd door stichting Grand Ballon. In 2008 namen circa 15.000 wielrenners deel aan de zeventiende editie van dit evenement. Naast de tochten zijn er ook twee dagen lang nevenactiviteiten om de fietsliefhebbers te vermaken, zoals een grote fietsbeurs in de openlucht.',
            trigger: '90'
        },

        {
            id: '4',
            message: 'Test',
            trigger: '90'
        },

        {
            id: '90',
            message: 'Heb ik jou hiermee geholpen?',
            trigger: '99'
        },

        {
            id: '99',
            options: [
                { value: 'Ja', label: 'Ja', trigger: '100' },
                { value: 'Nee', label: 'Nee', trigger: '101' },
            ]
        },

        {
            id: '101',
            message: 'Jammer!',
            trigger: '1'
        },

        {
            id: '100',
            message: 'Graag gedaan!',
            trigger: '1'
        },

    ];

    return (
        <Modal animationType='slide' visible={visible}  >

            <ChatBot headerComponent={
                <View style={{ flexDirection: 'row', height: 80 }}>
                    <View style={{ flex: '1', justifyContent: 'flex-end' }}>
                        <TouchableOpacity onPress={onClose} style={{ marginLeft: 10, marginBottom: 10, }} >
                            <Text style={{ color: Colors.primary, fontSize: 16 }}>Sluiten</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: '1', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <Text style={{ fontSize: 17, fontWeight: '600', marginBottom: 10 }}>Chatbot</Text>

                    </View>
                    <View style={{ flex: '1' }}>

                    </View>

                </View>}
                style={{ height: '100%' }} steps={steps} placeholder='Typ uw bericht...' optionBubbleColor={Colors.secondary} submitButtonContent='Enter' botBubbleColor={Colors.primary} keyboardVerticalOffset={0} />
        </Modal>
    )
}

export default ChatBotModal