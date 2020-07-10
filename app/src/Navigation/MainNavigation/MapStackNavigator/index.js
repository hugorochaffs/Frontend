import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Main from '../../../pages/Main';
import CreateHelp from '../../../pages/helpPages/createHelp';
import HelpDetails from '../../../pages/helpPages/helpDetails';
import headerStyle from '../MainNavigationStyles/MainStackHeaderStyle';

const Stack = createStackNavigator();

const MainNavigation = () => (
    <Stack.Navigator initialRouteName="main" screenOptions={headerStyle}>
        <Stack.Screen
            name="main"
            component={Main}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name="createHelp"
            options={{ title: 'Pedir ajuda' }}
            component={CreateHelp}
        />
        <Stack.Screen
            name="helpDetails"
            options={{ title: 'Detalhes' }}
            component={HelpDetails}
        />
    </Stack.Navigator>
);

export default MainNavigation;
