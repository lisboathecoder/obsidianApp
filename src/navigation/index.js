import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import Home from '../screens/home';
import Biblioteca from '../screens/biblioteca';
import Favoritos from '../screens/favoritos';

const Tab = createBottomTabNavigator();

const colors = {
  background: '#0e0e0e',
  primary: '#ba9eff',
  inactive: '#71717a',
};

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            backgroundColor: 'rgba(14, 14, 14, 0.95)',
            borderTopWidth: 0,
            height: 80,
            paddingBottom: 20,
            paddingTop: 10,
            position: 'absolute',
          },
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.inactive,
          tabBarLabelStyle: {
            fontSize: 10,
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: 1,
          },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Biblioteca') {
              iconName = focused ? 'library' : 'library-outline';
            } else if (route.name === 'Favoritos') {
              iconName = focused ? 'heart' : 'heart-outline';
            }

            return <Ionicons name={iconName} size={24} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Biblioteca" component={Biblioteca} />
        <Tab.Screen name="Favoritos" component={Favoritos} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
