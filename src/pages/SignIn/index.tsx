import React, { useState, useCallback, useEffect } from "react";
import { View, Text, KeyboardAvoidingView, Alert } from "react-native";

import Icon from "react-native-vector-icons/AntDesign";

import Input from "../../components/Input";
import Button from "../../components/Button";

import { useAuth } from "../../hooks/auth";

import { Container, EmailText } from "./styles";
import { ScrollView } from "react-native-gesture-handler";

import axios from "axios";

const SignIn: React.FC = () => {
  const [viewDisplay, setViewDisplay] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn } = useAuth();

  return (
    <Container>
      <Icon
        name="github"
        size={160}
        color="#000"
        style={{ marginBottom: 40 }}
      />

      <View style={{ width: "100%", display: viewDisplay ? "flex" : "none" }}>
        <Input
          autoCorrect={false}
          autoCapitalize="none"
          keyboardType="email-address"
          onChangeText={(text) => setEmail(text)}
          placeholder="E-mail"
          placeholderTextColor="#c1c5cc"
        />
        <Button onPress={() => setViewDisplay(false)}>Next</Button>
      </View>

      <View style={{ width: "100%", display: viewDisplay ? "none" : "flex" }}>
        <EmailText>{email}</EmailText>
        <Input
          secureTextEntry
          autoCorrect={false}
          autoCapitalize="none"
          returnKeyType="send"
          onSubmitEditing={() => {
            signIn(email, password);
          }}
          onChangeText={(text) => setPassword(text)}
          placeholder="Password"
          placeholderTextColor="#c1c5cc"
        />
        <Button onPress={() => signIn(email, password)}>Login</Button>
        <Button onPress={() => setViewDisplay(true)}>Back</Button>
      </View>
    </Container>
  );
};

export default SignIn;
