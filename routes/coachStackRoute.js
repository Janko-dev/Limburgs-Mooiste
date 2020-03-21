import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Colors } from '../constants';
import { StyleSheet, Button} from 'react-native';
import { Icon } from 'react-native-elements';


import CoachingScreen from '../screens/coaching/coachingScreen'

const Stack = createStackNavigator();

export default () => {
    return (
        <Stack.Navigator screenOptions={{
            headerStyle: {
              backgroundColor: "#fff",
            },
            headerTintColor: "#000",
            headerTitleStyle: {
              fontWeight: 'bold',
              fontStyle: 'italic'
            },
          }}>
            <Stack.Screen name="Coaching" component={CoachingScreen} options={{

            }}/>
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({
    tabBarStyle: {
        backgroundColor: Colors.secondary
    }
})