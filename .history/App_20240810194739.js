import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./Home";
import TodoDetails from "./TodoDetails";

const Tab = createBottomTabNavigator();

export default function App() {
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
