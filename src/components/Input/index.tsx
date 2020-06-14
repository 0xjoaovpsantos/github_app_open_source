import React from "react";
import { TextInputProps } from "react-native";

import { Container, TextInput } from "./styles";

const Input: React.FC<TextInputProps> = ({ ...rest }) => {
  return (
    <Container>
      <TextInput {...rest} />
    </Container>
  );
};

export default Input;
