import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { StyleSheet } from 'react-native';
import { Colors } from '../constants';
import ProgressionBar from '../components/progressionBar';

import TrainingScreen from '../screens/training/trainingScreen'
import SessionScreen from '../screens/training/sessionScreen';
import ScheduleDetailScreen from '../screens/training/scheduleDetails'

const Stack = createStackNavigator();

export default () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerTintColor: 'black',
                headerStyle: styles.headerStyle,
                headerRight: () => <ProgressionBar />
            }}
        >
            <Stack.Screen name="Training" component={TrainingScreen} />
            <Stack.Screen name="Sessions" component={SessionScreen} />
            <Stack.Screen name="Details" component={ScheduleDetailScreen} />
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({
    headerStyle: {
        height: 80,
        backgroundColor: 'white'
    }
})