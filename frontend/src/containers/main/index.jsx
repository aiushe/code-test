import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Container } from "./styles";
import { onLoadDashboardUsers } from "../../redux/actions/dashboard-actions";
import UserListAndContent from "../../components/UserList";

export const MainContainer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(onLoadDashboardUsers());
    // eslint-disable-next-line
  }, []);

  console.log("MainContainer component is being rendered.");
  return (
    <Container>
      <UserListAndContent />
    </Container>
  );
};

/*
      <h1>Users</h1>
<UsersListContainer>
        {users.map((user) => (
          <UserContainer key={`user-${user.id}`}>
            <h3>{user.name}</h3>
            <button>View Content</button>
          </UserContainer>
        ))}
      </UsersListContainer>
 */