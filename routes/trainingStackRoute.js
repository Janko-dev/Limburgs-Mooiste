import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { StyleSheet } from 'react-native';
import { Colors } from '../constants';
import ProgressionBar from '../components/progressionBar';

import TrainingScreen from '../screens/training/trainingScreen'
import SessionScreen from '../screens/training/sessionScreen';

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
            <Stack.Screen name="Training" component={TrainingScreen} />
            <Stack.Screen name="Sessions" component={SessionScreen} />
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({
    headerStyle: {
        height: 80,
        backgroundColor: Colors.secondary
    }
})