import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Colors } from '../constants';
import { StyleSheet, Button} from 'react-native';
import { Icon } from 'react-native-elements';


import CoachingScreen from '../screens/coaching/coachingScreen'
import { StyleSheet } from 'react-native';
import { Colors } from '../constants';
import ProgressionBar from '../components/progressionBar';

const Stack = createStackNavigator();

export default () => {
    return (

        <Stack.Navigator
            screenOptions={{
                headerTintColor: Colors.primary,
                headerStyle: styles.headerStyle,
                headerRight: () => <ProgressionBar />
            }}
        >
            <Stack.Screen name="Coaching" component={CoachingScreen} />
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({
    headerStyle: {
        height: 80,
        backgroundColor: Colors.secondary
    }
})