import React, { useState, useEffect, useCallback } from "react";
import { View, Text, Button } from "react-native";

import { ReposUser_URL } from "../../utils/urls";

import axios from "axios";

import { useAuth } from "../../hooks/auth";

interface ReposProps {
  id: number;
  name: string;
  description: string | null;
}

const Dashboard: React.FC = () => {
  const { signOut, codeAccess } = useAuth();
  const [repo, setRepos] = useState<ReposProps[]>([]);

  const getRepos = useCallback(async () => {
    try {
      const instance = axios.create({
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          Authorization: `Basic ${codeAccess}`,
        },
      });

      const response = await instance.get(`${ReposUser_URL}`);

      if (response.status == 200) {
        setRepos(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    getRepos();
  }, []);

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
