import styled from "styled-components/native";

export const Container = styled.View`
  padding: 0 20px;
`;

export const ContainerRepositoryName = styled.View`
  height: 60px;
  border-color: #c2c5c6;
  border-width: 2px;
  border-style: solid;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

export const ContainerCommit = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

export const RepositoryName = styled.Text`
  font-size: 16px;
  text-align: center;
`;

export const ContainerMessage = styled.View`
  flex: 1;
  padding: 10px 10px;
  margin: 10px;
  border-color: #c1c5c6;
  border-width: 2px;
  border-style: solid;
  border-radius: 10px;
`;

export const CommitMessage = styled.Text`
  font-size: 16px;
`;

export const Underline = styled.View`
  border-width: 1px;
  border-color: #c1c5c6;
  border-style: solid;
`;
