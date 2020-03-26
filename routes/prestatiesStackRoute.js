import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import PrestatieScreen from '../screens/prestaties/prestatieScreen'
import { StyleSheet } from 'react-native';
import { Colors } from '../constants';
import ProgressionBar from '../components/progressionBar';

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
            <Stack.Screen name="Prestatie" component={PrestatieScreen} />
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({
    headerStyle: {
        height: 80,
        backgroundColor: 'white'
    }
})