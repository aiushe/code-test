import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Roboto', sans-serif;
  }
`;

export const Container = styled.div`
  padding: 1rem;
`;

export const UsersListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const UserContainer = styled.div``;

export const UserContentContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

