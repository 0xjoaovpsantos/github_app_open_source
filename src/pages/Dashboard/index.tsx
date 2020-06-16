import React, { useState, useEffect, useCallback } from "react";
import { View, Text, Button, Image } from "react-native";

import { ReposUser_URL } from "../../utils/urls";

import githubLogoImg from "../../assets/github_logo.png";

import axios from "axios";

import {
  ContainerSearchInput,
  SearchInput,
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
  const [allRepos, setAllRepos] = useState<ReposProps[]>([]);
  const [searchRepos, setSearchRepos] = useState<ReposProps[]>();

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
        setAllRepos(response.data);
        setSearchRepos(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  const updateListRepos = useCallback((text) => {
    const repos = allRepos.filter((repo) => {
      if (repo.name.includes(text)) return repo;
    });
    setSearchRepos(repos);
  }, []);

  useEffect(() => {
    getRepos();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
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
      <ContainerSearchInput>
        <SearchInput
          placeholder="Repository Search"
          onChangeText={(text) => updateListRepos(text)}
        ></SearchInput>
      </ContainerSearchInput>
      <FlatList
        data={searchRepos}
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
