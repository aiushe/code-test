import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onLoadDashboardUsers } from "../redux/actions/dashboardActions";
import styled from "styled-components";

// user item
const UserItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ccc;
`;

// button for the "View Content" action
const ViewContentButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 8px 16px;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const UserList = () => {
  const dispatch = useDispatch();
  
  // get users and loading state from Redux
  const users = useSelector((state) => state.dashboard.users);
  const loading = useSelector((state) => state.dashboard.loading);

  // load users
  useEffect(() => {
    dispatch(onLoadDashboardUsers());
  }, [dispatch]);

  //loading message
  if (loading) {
    return <div>loading users...</div>;
  }

  // display list of users
  return (
    <div>
      {users && users.length > 0 ? (
        users.map((user) => (
          <UserItem key={user.id}>
            <div>{user.name}</div>
            <ViewContentButton>View Content</ViewContentButton>
          </UserItem>
        ))
      ) : (
        <div>No users found</div>
      )}
    </div>
  );
};

export default UserList;
