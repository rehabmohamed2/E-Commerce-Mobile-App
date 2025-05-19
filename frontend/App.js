import React, { useEffect } from 'react';
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Constants from 'expo-constants';
import Toast from 'react-native-toast-message';

import { AuthProvider, useAuth } from './src/context/AuthContext';
import { CartProvider } from './src/context/CartContext';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import LoadingScreen from './src/components/LoadingScreen';
import MainTabNavigation from './src/navigation/Navigator';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <Stack.Screen name="Main" component={MainTabNavigation} />
      ) : (
        <>
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="SignupScreen" component={SignupScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default function App() {
  useEffect(() => {
    const isDebugMode = Constants.expoConfig?.extra?.debug;
    if (!isDebugMode) {
      console.log = () => {};
      console.warn = () => {};
      console.error = () => {};
      LogBox.ignoreAllLogs(true);
    }
  }, []);

  return (
    <AuthProvider>
      <CartProvider>
        <NavigationContainer>
          <Navigation />
        </NavigationContainer>
        <Toast /> 
      </CartProvider>
    </AuthProvider>
  );
}
