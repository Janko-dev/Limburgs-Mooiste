import React, { useEffect, useState } from 'react';
import { Modal, StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { globalStyles, Colors } from '../../constants';
import ChatBot from 'react-native-chatbot-expo';
import firebase from '../../api/firebase';
import ProgressionBar from '../../components/progressionBar';


const ChatBotModal = ({ visible, onClose }) => {

      const [userRecord, setUserRecord] = useState(null)

      useEffect(() => {
        if (firebase.getCurrentUser()){
            const unsubscribe = firebase.onUserDataChange(firebase.getCurrentUser().uid, userDoc => {
                setUserRecord(userDoc.data());
            })

            return unsubscribe;
        }

      }, [userRecord])

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
            trigger: ({value, steps}) => {
                let message = steps['2']['message'].toLowerCase()
                if (message.includes('limburg') || message.includes('mooiste')) {
                    return '3'
                }
                else if (message.includes('level') || message.includes('exp')) {
                    let options = ['20', '21', '22', '23']
                    let index = Math.round(Math.random() * (options.length - 1) + 1) - 1
                    return options[index]
                }   
                else if (message.includes('training') || message.includes('schema')) {
                        return '30'
                }

                else if (message.includes('training') && message.includes('niveau')) {
                    return '40'
                }
                else if (message.includes('blessure') || message.includes('pijn')) {
                            return '50'
                } else {
                    return '1000'
                }
            }
        },

        {
            id: '20',
            message: 'Wist je dat je dagelijks exp kan verdienen door content te delen of een gesprek met mij te voeren?',
            trigger: '90'
         },

         {
            id: '21',
            message: 'Wist je dat je een level omhoog kan gaan wanneer je genoeg exp verdient?',
            trigger: '90'
         },

         {
            id: '22',
            message: 'De beste manier om exp te verdienen is om trainingen te volgen.',
            trigger: '90'
         },

         {
            id: '23',
            message: 'Door bepaalde criteria te voltooien kun je achievements behalen!',
            trigger: '90'
         },

         {
            id: '30',
            message: 'Voor gerichte vragen over trainingen en schemas kun je het beste terecht bij je coach, ik kan je alleen doorverwijzen.',
            trigger: '90'
         },

         {
            id: '40',
            message: 'Zorg dat je trainingschemas volgt die aansluiten op je startniveau, zo voorkom je blessures en overtraining.',
            trigger: '90'
         },

        {
            id: '50',
            message: 'Op een schaal van 1-5, hoeveel pijn heb je?',
            trigger: '51'
         },

         {
            id: '51',
            options: [
                { value: '1', label: '1', trigger: '52'},
                { value: '2', label: '2', trigger: '52'},
                { value: '3', label: '3', trigger: '52'},
                { value: '4', label: '4', trigger: '53'},
                { value: '5', label: '5', trigger: '53'},

            ]      
         },

         {
            id: '52',
            message: 'Pak een week rust en hervat dan je trainingsschema.',
            trigger: '90'
        },

        
        {
            id: '53',
            message: 'Neem contact op met een specialist, doortrainen is onverantwoord.',
            trigger: '90'
        },

        {
            id: '3',
            message: 'Limburgs Mooiste is een fietsevenement voor wielerliefhebbers dat elk jaar in het weekend na Pinksteren in de Limburgse heuvels wordt gehouden. De tocht wordt georganiseerd door stichting Grand Ballon. In 2008 namen circa 15.000 wielrenners deel aan de zeventiende editie van dit evenement. Naast de tochten zijn er ook twee dagen lang nevenactiviteiten om de fietsliefhebbers te vermaken, zoals een grote fietsbeurs in de openlucht.',
            trigger: '90'
        },

        {
            id: '1000',
            message: 'Hier kan ik je helaas niet mee helpen. Probeer iets anders',
            trigger: '2'
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
          trigger: ({value, steps}) => {
                
            firebase.setExp(userRecord.exp + 2, firebase.getCurrentUser().uid)
            return '1'

        }
        },

    ];

    return (
        <Modal animationType='slide' visible={visible}  >
                <ChatBot headerComponent={
                            <View style={{ flexDirection: 'row', height: 80}}>
                            <View style={{flex: '2',  justifyContent: 'flex-end'}}>
                                <TouchableOpacity onPress={onClose} style={{marginLeft: 10, marginBottom: 10, }} >
                                    <Text style={{color: Colors.primary, fontSize: 16}}>Sluiten</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{flex: '2', justifyContent: 'flex-end', alignItems: 'flex-start'}}>
                                <Text style={{fontSize: 17, fontWeight: '600', marginBottom: 10, marginLeft: 10}}>Chatbot</Text>
            
                            </View>
                            <View style={{flex: '1', justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 10}}>
                                <ProgressionBar />
                            </View>
            
                        </View>}
                          style={{height: '100%'}} steps={steps} placeholder='Typ uw bericht...' optionBubbleColor={Colors.secondary} submitButtonContent='Enter' botBubbleColor={Colors.primary} keyboardVerticalOffset={0} />
        </Modal>
    )
}

export default ChatBotModal