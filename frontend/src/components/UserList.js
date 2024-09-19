import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onLoadDashboardUsers, onLoadUserContent } from "../redux/actions/dashboard-actions";
import styled from "styled-components";
import UserContent from "./UserContent";

console.log("UserList component is being imported.");

// Styled components for consistent UI
const UserContainer = styled.div`
  margin: 20px;
`;

// Styled item for displaying user
const UserItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #eee;
`;

// Styled button for viewing content
const ViewContentButton = styled.button`
  background-color: #FF0000; //TODO: change to #007bff
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
  }
`;

// UserList component
const UserList = () => {
  const dispatch = useDispatch();
  
  const users = useSelector((state) => state.dashboard.users);
  const userContent = useSelector((state) => state.dashboard.userContent);
  const loadingUsers = useSelector((state) => state.dashboard.isLoading);
  const loadingContentByUser = useSelector((state) => state.dashboard.loadingContentByUser);

  const [activeUser, setActiveUser] = useState(null);

  useEffect(() => {
    dispatch(onLoadDashboardUsers());
  }, [dispatch]);

  // Handler for viewing a user's content
  const handleViewContent = (userId) => {
    if (activeUser === userId) {
      setActiveUser(null);
    } else {
      setActiveUser(userId);
      dispatch(onLoadUserContent(userId));
    }
  };  

  // Show loading state while fetching users
  console.log("loadingUsers:", loadingUsers);
  console.log("users:", users);
  console.log("userContent:", userContent);
  console.log("loadingContentByUser:", loadingContentByUser);
  console.log("activeUser:", activeUser);
  
  if (loadingUsers) {
    return <div>Loading users...</div>;
  }

  // Render the user list and content
  console.log("Rendering UserList component");
  
  return (
    <UserContainer>
      <h2>Users</h2>
      {users.map((user) => (
        <div key={user.id}>
          <UserItem>
            <div>{user.name}</div>
            {/* Button to toggle viewing user's content */}
            <ViewContentButton
              onClick={() => handleViewContent(user.id)}
              disabled={loadingContentByUser[user.id]}
            >
              {activeUser === user.id ? "Hide Content" : "View Content"}
            </ViewContentButton>
          </UserItem>
          {activeUser === user.id && (
            <>
              {loadingContentByUser[user.id] ? (
                <div>Loading content...</div>
              ) : userContent[user.id] ? (
                <UserContent
                  userId={user.id}
                  content={userContent[user.id]}
                />
              ) : (
                <div>No content available for this user.</div>
              )}
            </>
          )}
        </div>
      ))}
    </UserContainer>
  );
};

export default UserList;
