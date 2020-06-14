import React from "react";
import { View, Text, KeyboardAvoidingView } from "react-native";

import Icon from "react-native-vector-icons/AntDesign";

import Input from "../../components/Input";
import Button from "../../components/Button";

import { Container } from "./styles";
import { ScrollView } from "react-native-gesture-handler";

const SignIn: React.FC = () => (
  <Container>
    <Icon name="github" size={160} color="#fff" />
    <Input placeholder="E-mail" placeholderTextColor="#000" />
    <Input placeholder="Password" placeholderTextColor="#000" />
    <Button>Next</Button>
    <Button>Login</Button>
    <Button>Back</Button>
  </Container>
);

export default SignIn;
