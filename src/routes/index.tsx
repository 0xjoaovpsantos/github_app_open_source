import React from "react";
import { View, ActivityIndicator } from "react-native";

import { useAuth } from "../hooks/auth";

import AppRoutes from "./app.routes";
import AuthRoutes from "./auth.routes";
import { createNativeWrapper } from "react-native-gesture-handler";

const Routes: React.FC = () => {
  const { loading, codeAccess } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#999" />
      </View>
    );
  }

  return codeAccess != "" ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
