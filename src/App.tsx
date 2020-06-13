import "react-native-gesture-handler";
import React from "react";
import { View, Text, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import AuthRoutes from "./routes/auth.routes";

const App: React.FC = () => (
  <NavigationContainer>
    <StatusBar barStyle="dark-content" backgroundColor="#fff" />
    <AuthRoutes />
  </NavigationContainer>
);

export default App;
