import React, { useState, useCallback, useEffect } from "react";
import { View, Text, KeyboardAvoidingView, Alert } from "react-native";

import { encode } from "base-64";

import Icon from "react-native-vector-icons/AntDesign";

import Input from "../../components/Input";
import Button from "../../components/Button";

import { ContainerEmail, ContainerPassword } from "./styles";

import { Container } from "./styles";
import { ScrollView } from "react-native-gesture-handler";

import axios from "axios";

import { Login_URL } from "../../utils/urls";

const SignIn: React.FC = () => {
  const [viewDisplay, setViewDisplay] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function onSubmit() {
    const code_access = encode(`${email}:${password}`);

    try {
      const response = await fetch(`${Login_URL}/user`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          Authorization: `Basic ${code_access}`,
        },
      });

      if (response.status === 200) {
        Alert.alert("logado");
      } else {
        Alert.alert("Verifique seu email e senha corramente");
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Container>
      <Icon name="github" size={160} color="#fff" />

      <View style={{ width: "100%", display: viewDisplay ? "flex" : "none" }}>
        <Input
          onChangeText={(text) => setEmail(text)}
          placeholder="E-mail"
          placeholderTextColor="#000"
        />
        <Button onPress={() => setViewDisplay(false)}>Next</Button>
      </View>

      <View style={{ width: "100%", display: viewDisplay ? "none" : "flex" }}>
        <Input
          onChangeText={(text) => setPassword(text)}
          placeholder="Password"
          placeholderTextColor="#000"
        />
        <Button onPress={() => onSubmit()}>Login</Button>
        <Button onPress={() => setViewDisplay(true)}>Back</Button>
      </View>
    </Container>
  );
};

export default SignIn;
