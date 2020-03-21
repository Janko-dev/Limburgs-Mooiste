import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Icon } from 'react-native-elements';
import { StyleSheet, View, Text } from 'react-native';

import firebase from '../api/firebase';
import { Colors } from '../constants';

import ProfielStack from './profielStackRoute';
import CoachStack from './coachStackRoute';
import TrainingStack from './trainingStackRoute';
import PrestatieStack from './prestatiesStackRoute';
import DashboardStack from './dashboardStackRoute';

import WizardModal from '../screens/modals/wizardModal';
import LoginModal from '../screens/modals/loginModal';

const Tab = createMaterialBottomTabNavigator();

const Navigator = () => {

    const [user, setUser] = useState(firebase.getCurrentUser())
    const [loginModal, setLoginModal] = useState(false)
    const [wizardModal, setWizardModal] = useState(false)

    useEffect(() => {
        const unsubscribe = firebase.onAuthChange((user) => {
            setUser(user)
            if (!user) {
                setLoginModal(true)
            }
        })

        return unsubscribe;
    }, [firebase])

    const loginHandler = () => {
        setLoginModal(false);
        if (!user){
            setWizardModal(true);
        }
    }

    const registerUserHandler = (userData) => {
        firebase.createNewUserRecord(user.uid, userData.skillOption, userData.trainingDaysOption)
        setWizardModal(false);
    }

    return (
        <NavigationContainer>

            <LoginModal isVisible={loginModal} login={loginHandler}/>
            <WizardModal isVisible={wizardModal} onFinish={registerUserHandler} />

            <Tab.Navigator shifting={true} activeColor={Colors.primary} barStyle={styles.tabBarStyle}>
                <Tab.Screen
                    name='Dashboard'
                    component={DashboardStack}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <Icon
                                type='ionicon'
                                name='ios-stats'
                                color={color}
                                size={30}
                            />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Prestaties"
                    component={PrestatieStack}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <Icon
                                type='ionicon'
                                name='ios-ribbon'
                                color={color}
                                size={30}
                            />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Training"
                    component={TrainingStack}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <Icon
                                type='ionicon'
                                name='ios-bicycle'
                                color={color}
                                size={28}
                            />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Coaching"
                    component={CoachStack}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <Icon
                                type='ionicon'
                                name='ios-megaphone'
                                color={color}
                                size={30}
                            />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Profiel"
                    component={ProfielStack}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <Icon
                                type='ionicon'
                                name='ios-person'
                                color={color}
                                size={30}
                            />
                        ),
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default Navigator;

const styles = StyleSheet.create({
    tabBarStyle: {
        backgroundColor: Colors.secondary
    },
})