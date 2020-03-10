import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import DashboardScreen from '../screens/dashboard/dashboardScreen'

const Stack = createStackNavigator();

export default () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="DashboardScreen" component={DashboardScreen}/>
        </Stack.Navigator>
    )
}