import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Dashboard from "../pages/Dashboard";
import Commits from "../pages/Commits";

const App = createStackNavigator();

const AuthRoutes: React.FC = () => (
  <App.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: "#312e38" },
    }}
  >
    <App.Screen name="Dashboard" component={Dashboard} />
    <App.Screen name="Commits" component={Commits} />
  </App.Navigator>
);

export default AuthRoutes;
