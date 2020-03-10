import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import ProfielStack from './profielStackRoute';
import CoachStack from './coachStackRoute';
import TrainingStack from './trainingStackRoute';
import PrestatieStack from './prestatiesStackRoute';
import DashboardStack from './dashboardStackRoute';
import LoginModal from '../screens/modals/loginModal';

const Tab = createMaterialBottomTabNavigator();

export default () => {

    return (
        <NavigationContainer>

            <LoginModal />

            <Tab.Navigator shifting={false}>
                <Tab.Screen name="Profiel" component={ProfielStack} />
                <Tab.Screen name="Coaching" component={CoachStack} />
                <Tab.Screen name="Training" component={TrainingStack} />
                <Tab.Screen name="Prestaties" component={PrestatieStack} />
                <Tab.Screen name="Dashboard" component={DashboardStack} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}