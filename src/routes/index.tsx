import React from "react";
import { View, ActivityIndicator } from "react-native";

import { useAuth } from "../hooks/auth";

import AuthRoutes from "./auth.routes";

const Routes: React.FC = () => {
  const { loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#999" />
      </View>
    );
  }

  return <AuthRoutes />;
};

export default Routes;
