import React, { useState, useCallback } from "react";
import { View, Text, KeyboardAvoidingView } from "react-native";

import Icon from "react-native-vector-icons/AntDesign";

import Input from "../../components/Input";
import Button from "../../components/Button";

import { ContainerEmail, ContainerPassword } from "./styles";

import { Container } from "./styles";
import { ScrollView } from "react-native-gesture-handler";

const SignIn: React.FC = () => {
  const [viewDisplay, setViewDisplay] = useState(true);

  return (
    <Container>
      <Icon name="github" size={160} color="#fff" />

      <View style={{ width: "100%", display: viewDisplay ? "flex" : "none" }}>
        <Input placeholder="E-mail" placeholderTextColor="#000" />
        <Button onPress={() => setViewDisplay(false)}>Next</Button>
      </View>

      <View style={{ width: "100%", display: viewDisplay ? "none" : "flex" }}>
        <Input placeholder="Password" placeholderTextColor="#000" />
        <Button>Login</Button>
        <Button onPress={() => setViewDisplay(true)}>Back</Button>
      </View>
    </Container>
  );
};

export default SignIn;
