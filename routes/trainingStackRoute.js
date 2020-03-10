import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import TrainingScreen from '../screens/training/trainingScreen'

const Stack = createStackNavigator();

export default () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="TrainingScreen" component={TrainingScreen}/>
        </Stack.Navigator>
    )
}