import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import {
  HomeIcon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
} from "react-native-heroicons/outline";
import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import CartScreen from "../screens/CartScreen";
import ProductDetailScreen from "../screens/ProductDetailScreen";
import SignupScreen from "../screens/SignupScreen"; 
import LoginScreen from "../screens/LoginScreen"; 
import LocationPickerScreen from "../screens/LocationPickerScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const ActiveColor = "#000000"; 
const inActiveColor = "#C0C0C0"; 

const MainTabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: ActiveColor,
        tabBarInactiveTintColor: inActiveColor,
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: { height: 60 },
        tabBarIcon: ({ color }) => {
          if (route.name === "HomeToDetails") {
            return <HomeIcon color={color} />;
          } else if (route.name === "SearchToDetails") {
            return <MagnifyingGlassIcon color={color} />;
          } else if (route.name === "CartScreen") {
            return <ShoppingBagIcon color={color} />;
          }
        },
      })}
    >
      <Tab.Screen name="HomeToDetails" component={HomeToDetails} />
      <Tab.Screen name="SearchToDetails" component={SearchToDetails} />
      <Tab.Screen name="CartScreen" component={CartScreen} />
    </Tab.Navigator>
  );
};

const HomeToDetails = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProductDetailScreen"
        component={ProductDetailScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LocationPickerScreen"
        component={LocationPickerScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const SearchToDetails = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProductDetailScreen"
        component={ProductDetailScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const LoginToDetails = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MainTabNavigation"
        component={MainTabNavigation}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};


const RootNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="SignupScreen">
      <Stack.Screen
        name="SignupScreen"
        component={SignupScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Main"
        component={MainTabNavigation}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;