import React from "react";
import { View, Text, Button } from "react-native";

import { useAuth } from "../../hooks/auth";

const Dashboard: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <View style={{ flex: 1, backgroundColor: "blue" }}>
      <Text>DASHBOARD</Text>
      <Button title="deslogar" onPress={() => signOut()}>
        <Text>Deslogar</Text>
      </Button>
    </View>
  );
};

export default Dashboard;
