import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, UserContainer, UsersListContainer } from "./styles";
import { onLoadDashboardUsers } from "../../redux/actions/dashboard-actions";
import UserList from "../../components/UserList";

export const MainContainer = () => {
  const dispatch = useDispatch();

  const users = useSelector((state) => state.dashboard.users);

  useEffect(() => {
    dispatch(onLoadDashboardUsers());
    // eslint-disable-next-line
  }, []);

  console.log("MainContainer component is being rendered.");
  return (
    <Container>
      <h1>Users</h1>
      <UsersListContainer>
        {users.map((user) => (
          <UserContainer key={`user-${user.id}`}>
            <h3>{user.name}</h3>
            <button>View Content</button>
          </UserContainer>
        ))}
      </UsersListContainer>
      <UserList />
    </Container>
  );
};
