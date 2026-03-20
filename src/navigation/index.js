import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

// Importando suas telas
import Home from '../screens/home';
import Favoritos from '../screens/favoritos';
import Biblioteca from '../screens/biblioteca';
import DetalheRd2 from '../screens/detalheRd2';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// 1. Criamos as abas de baixo
function TabRoutes() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Início" component={Home} />
      <Tab.Screen name="Favoritos" component={Favoritos} />
      <Tab.Screen name="Biblioteca" component={Biblioteca} />
    </Tab.Navigator>
  );
}

// 2. Criamos a pilha principal (Stack) que envolve as abas + a tela de detalhe
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* A primeira tela da pilha são as Abas */}
        <Stack.Screen 
          name="MainTabs" 
          component={TabRoutes} 
          options={{ headerShown: false }} 
        />
        {/* A tela de detalhe fica "escondida" da Tab Bar */}
        <Stack.Screen name="Detalhe" component={DetalheRd2} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}