import { StatusBar } from 'expo-status-bar';
import React from 'react';
import MainStack from './routes/MainStack';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <NavigationContainer>
      <MainStack/>
    </NavigationContainer>
  );
}
