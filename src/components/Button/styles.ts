import styled, { css } from "styled-components/native";
import { RectButton } from "react-native-gesture-handler";

export const Container = styled.TouchableOpacity`
  height: 40px;
  width: 60px;
  color: #000;
  margin: 20px auto;
  justify-content: center;
  align-items: center;
  border-width: 1px;
  border-color: #000;
  border-style: solid;
  border-radius: 10px;
`;

export const ButtonText = styled.Text`
  color: #000;
  font-size: 16px;
`;
