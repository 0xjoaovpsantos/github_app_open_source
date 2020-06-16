import React, { useState, useEffect, useCallback } from "react";
import { View, Text } from "react-native";

import axios from "axios";

import { useAuth } from "../../hooks/auth";

import { Commits_URL } from "../../utils/urls";

import { useNavigation } from "@react-navigation/native";

import { FlatList } from "react-native-gesture-handler";

import { NameRepository, ContainerCommit, CommitMessage } from "./styles";

interface CommitsProps {
  commit: string;
  commiter: object;
}

const Commits: React.FC = ({ route }) => {
  const navigation = useNavigation();

  const [commits, setCommits] = useState([]);

  const { codeAccess } = useAuth();
  //joaovictorpsantos/agenda-lp3-backend/commits

  const { name, user } = route.params;

  const getCommits = useCallback(async () => {
    try {
      const instance = axios.create({
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          Authorization: `Basic ${codeAccess}`,
        },
      });

      const response = await instance.get(
        `${Commits_URL}/${user}/${name}/commits`
      );

      if (response.status == 200) {
        setCommits(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    getCommits();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Text>{name}</Text>
      <FlatList
        data={commits}
        keyExtractor={(commit) => commit.node_id}
        renderItem={({ item }) => (
          <ContainerCommit>
            <CommitMessage>{item.commit.message}</CommitMessage>
          </ContainerCommit>
        )}
      ></FlatList>
    </View>
  );
};

export default Commits;
