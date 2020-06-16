import React, { useState, useEffect, useCallback } from "react";
import { View, Text, Button } from "react-native";

import { ReposUser_URL } from "../../utils/urls";

import axios from "axios";

import {
  ContainerRepository,
  RepositoryName,
  ContainerRepositoryDescription,
  RepositoryDescription,
  Underline,
} from "./styles";

import { useAuth } from "../../hooks/auth";
import { FlatList } from "react-native-gesture-handler";

interface ReposProps {
  id: number;
  name: string;
  description: string | null;
}

const Dashboard: React.FC = () => {
  const { signOut, codeAccess } = useAuth();
  const [repos, setRepos] = useState<ReposProps[]>([]);

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
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Text>DASHBOARD</Text>
      <FlatList
        data={repos}
        keyExtractor={(repository) => repository.id.toString()}
        renderItem={({ item: repository }) => (
          <ContainerRepository>
            <RepositoryName>{repository.name}</RepositoryName>
            <ContainerRepositoryDescription>
              <RepositoryDescription>
                {repository.description != null
                  ? repository.description
                  : "Not have description"}
              </RepositoryDescription>
            </ContainerRepositoryDescription>
            <Underline />
          </ContainerRepository>
        )}
      ></FlatList>
    </View>
  );
};

export default Dashboard;
