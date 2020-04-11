import React, { useState} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Colors } from '../constants';
import { StyleSheet, Button, Image} from 'react-native';
import { Icon } from 'react-native-elements';

import CoachingScreen from '../screens/coaching/coachingScreen'
import ProgressionBar from '../components/progressionBar';

import WhatsApp from '../api/whatsapp';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ChatBotModal from '../screens/modals/chatBotModal';

const Stack = createStackNavigator();

export default () => {

    const [visible, setVisible] = useState(false);

    const chatBotModalHandler = () => {
        setVisible(!visible);
    }

    return (

        <Stack.Navigator
            screenOptions={{
                headerTintColor: 'black',
                headerStyle: styles.headerStyle,
                headerRight: () => <ProgressionBar />,
                headerLeft: () => <TouchableOpacity onPress={chatBotModalHandler} >
                    <ChatBotModal visible={visible} onClose={chatBotModalHandler}></ChatBotModal>
                    <Image style={{ margin: 20, height: 30, width: 30, tintColor: Colors.secondary}} source={require('../assets/chatbotButton.png')}/>
                </TouchableOpacity>

            }}
        >
            <Stack.Screen name="Coaching" component={CoachingScreen} />
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({
    headerStyle: {
        height: 80,
        backgroundColor: 'white'
    }
})