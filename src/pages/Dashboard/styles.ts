import styled from "styled-components/native";

export const ContainerSearchInput = styled.View`
  margin: 20px 20px;
  padding: 0 20px;
  height: 60px;
  background-color: #fff;
  border-color: #c2c5c6;
  border-style: solid;
  border-width: 2px;
  border-radius: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

export const SearchInput = styled.TextInput`
  font-size: 16px;
`;

export const ContainerRepository = styled.TouchableOpacity`
  margin: 0px 20px;
`;

export const RepositoryName = styled.Text`
  color: #5e5e5e;
  font-size: 20px;
`;

export const ContainerRepositoryDescription = styled.View`
  border-color: #c2c5c6;
  border-width: 2px;
  border-style: solid;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  padding: 20px 20px;
`;

export const RepositoryDescription = styled.Text`
  color: #5e5e5e;
  font-size: 16px;
  text-align: center;
`;

export const Underline = styled.View`
  border-width: 1px;
  border-style: solid;
  border-color: #c2c5cc;
  margin-top: 20px;
  margin-bottom: 10px;
`;
