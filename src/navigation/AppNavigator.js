// navigation/AppNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screens/singupLogin/LoginScreen';
import HomeScreen from '../screens/homeScreens/HomeScreen'; 
import SplashScreen from '../screens/splashScreen/SplashScreen';
import LandingScreen from '../screens/splashScreen/LandingScreen';
import SingUpScreen from '../screens/singupLogin/SingUpScreen';
import SingUpScreen2 from '../screens/singupLogin/SingUpScreen2';
import MainTabScreen from "../navigation/BottomTabNavigator/src/BottomTabNavigator"


const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        {/* <Stack.Screen name="SingUpScreen" component={SingUpScreen} /> */}
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="MainTabScreen" component={MainTabScreen} />
        {/* <Stack.Screen name="spleceScreen" component={SplashScreen} />
        <Stack.Screen name="LandingScreen" component={LandingScreen} />
        <Stack.Screen name="SingUpScreen" component={SingUpScreen} />
        <Stack.Screen name="SingUpScreen2" component={SingUpScreen2} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
