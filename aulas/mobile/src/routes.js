import React from 'react';
import { NavigationContainer } from '@react-navigation/native'; // essencial para todas as rotas
import { createStackNavigator } from '@react-navigation/stack';
import Incidents from './pages/Incidents';
import Detail from './pages/Detail';

const AppStack = createStackNavigator();    // primeira navegação criada

export default function Routes() {
    return (
        <NavigationContainer>
            {/* componente que vem por volta das rotas */}
            {/* headerShown para tirar o cabeçalho das páginas */}
            <AppStack.Navigator screenOptions={{ headerShown: false }}>
                {/* para cada rota */}
                <AppStack.Screen name="Incidents" component={Incidents} />
                <AppStack.Screen name="Detail" component={Detail} />
            </AppStack.Navigator>
        </NavigationContainer>
    );
}