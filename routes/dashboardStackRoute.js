import React, {useState} from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import DashboardScreen from '../screens/dashboard/dashboardScreen'
import { StyleSheet, Image, TouchableOpacity } from 'react-native';

import { Colors } from '../constants';
import ProgressionBar from '../components/progressionBar';
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
                headerRight: () => <ProgressionBar/>,
                headerLeft: () => <TouchableOpacity onPress={chatBotModalHandler} >
                <ChatBotModal visible={visible} onClose={chatBotModalHandler}></ChatBotModal>
                <Image style={{ margin: 20, height: 30, width: 30, tintColor: Colors.secondary}} source={require('../assets/chatbotButton.png')}/>
            </TouchableOpacity>
            }}
        >
            <Stack.Screen name="Dashboard" component={DashboardScreen} />
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({
    headerStyle: {
        height: 80,
        backgroundColor: 'white'
    }
})