import React, { useState, useEffect, useCallback } from "react";
import { View, Text, Image } from "react-native";

import axios from "axios";

import { useAuth } from "../../hooks/auth";

import { Commits_URL } from "../../utils/urls";

import githubLogoImg from "../../assets/github_logo.png";

import { useNavigation } from "@react-navigation/native";

import { FlatList } from "react-native-gesture-handler";

import {
  Container,
  ContainerRepositoryName,
  RepositoryName,
  ContainerMessage,
  CommitMessage,
  ContainerCommit,
  Underline,
} from "./styles";

interface CommitsProps {
  commit: string;
  commiter: object;
}

const Commits: React.FC = ({ route }) => {
  const navigation = useNavigation();

  const [commits, setCommits] = useState([]);

  const { codeAccess } = useAuth();

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
      <Container>
        <View style={{ alignItems: "center" }}>
          <Image
            source={githubLogoImg}
            style={{
              height: 80,
              width: 300,

              resizeMode: "contain",
            }}
          />
        </View>
        <ContainerRepositoryName>
          <RepositoryName>{`${name} (${commits.length} commits)`}</RepositoryName>
        </ContainerRepositoryName>
        <FlatList
          data={commits}
          style={{ marginBottom: 80 }}
          keyExtractor={(commit) => commit.node_id}
          renderItem={({ item }) => (
            <>
              <ContainerCommit>
                <Image
                  source={{ uri: item.committer.avatar_url }}
                  style={{ width: 50, height: 50 }}
                />
                <ContainerMessage>
                  <CommitMessage>{item.commit.message}</CommitMessage>
                </ContainerMessage>
              </ContainerCommit>
              <Underline />
            </>
          )}
        ></FlatList>
      </Container>
    </View>
  );
};

export default Commits;
