import React, { useState, useEffect, useCallback } from "react";
import { View, Text, Button } from "react-native";

import { ReposUser_URL } from "../../utils/urls";

import { useAuth } from "../../hooks/auth";

interface ReposProps {
  id: number;
  name: string;
  description: string | null;
}

const Dashboard: React.FC = () => {
  const { signOut } = useAuth();
  const [repo, setRepos] = useState<ReposProps[]>([]);

  const { codeAccess } = useAuth();

  const getRepos = useCallback(async () => {
    const response = await fetch(`${ReposUser_URL}/user/repos`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: `Basic ${codeAccess}`,
      },
    });

    console.log(response);
  }, []);

  useEffect(() => {
    getRepos();
  });

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
