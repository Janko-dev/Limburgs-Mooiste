import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import PrestatieScreen from '../screens/prestaties/prestatieScreen'

const Stack = createStackNavigator();

export default () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="PrestatieScreen" component={PrestatieScreen}/>
        </Stack.Navigator>
    )
}