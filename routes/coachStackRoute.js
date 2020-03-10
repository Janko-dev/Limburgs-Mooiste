import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import CoachingScreen from '../screens/coaching/coachingScreen'

const Stack = createStackNavigator();

export default () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="CoachingScreen" component={CoachingScreen}/>
        </Stack.Navigator>
    )
}