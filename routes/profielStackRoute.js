import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ProfielScreen from '../screens/profiel/profielScreen'

const Stack = createStackNavigator();

export default () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="ProfielScreen" component={ProfielScreen}/>
        </Stack.Navigator>
    )
}