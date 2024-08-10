import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import Home from "./Home";
import TodoDetails from "./TodoDetails";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Details"
        component={TodoDetails}
        options={{ title: "Todo Details" }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === "HomeStack") {
              iconName = "home-outline";
            } else if (route.name === "TodoDetails") {
              iconName = "list-outline";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#6200EE",
          tabBarInactiveTintColor: "gray",
        })}>
        <Tab.Screen
          name="HomeStack"
          component={HomeStack}
          options={{ title: "Home" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
