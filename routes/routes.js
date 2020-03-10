import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import firebase from '../api/firebase';

import ProfielStack from './profielStackRoute';
import CoachStack from './coachStackRoute';
import TrainingStack from './trainingStackRoute';
import PrestatieStack from './prestatiesStackRoute';
import DashboardStack from './dashboardStackRoute';
import LoginModal from '../screens/modals/loginModal';

const Tab = createMaterialBottomTabNavigator();

export default () => {

    const [user, setUser] = useState(firebase.getUser())
    const [loginModal, setLoginModal] = useState(false)

    useEffect(() => {
        firebase.onAuthChange((user) => {
            setUser(user)
            if (!user) {
                setLoginModal(true)
            }
        })
    }, [])

    return (
        <NavigationContainer>

            <LoginModal isVisible={loginModal} login={() => setLoginModal(false)}/>

            <Tab.Navigator shifting={false}>
                <Tab.Screen name='Dashboard' component={DashboardStack} />
                <Tab.Screen name="Prestaties" component={PrestatieStack} />
                <Tab.Screen name="Training" component={TrainingStack} />
                <Tab.Screen name="Coaching" component={CoachStack} />
                <Tab.Screen name="Profiel" component={ProfielStack} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}