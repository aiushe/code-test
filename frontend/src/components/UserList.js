import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onLoadDashboardUsers, onLoadUserContent } from "../redux/actions/dashboard-actions";
import styled from "styled-components";
import UserContent from "./UserContent";

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
  background-color: #007bff;
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
  // Select relevant state from Redux store
  console.log("User content in Redux:", userContent);
  console.log("Loading content by user in Redux:", loadingContentByUser);
  console.log("Users in Redux:", users);
  console.log("Loading users in Redux:", loadingUsers);
  console.log("Active user in Redux:", activeUser);
  
  // Select relevant state from Redux store
  const users = useSelector((state) => state.dashboard.users);
  const userContent = useSelector((state) => state.dashboard.userContent);
  const loadingUsers = useSelector((state) => state.dashboard.loadingUsers);
  const loadingContentByUser = useSelector((state) => state.dashboard.loadingContentByUser);

  // State to track which user's content is currently being viewed
  const [activeUser, setActiveUser] = useState(null);

  // Debug log to check if user content is being fetched correctly
  console.log("user content:", userContent);
  console.log("loading content by user:", loadingContentByUser);
  console.log("users:", users);
  console.log("loading users:", loadingUsers);
  console.log("active user:", activeUser);
  
  useEffect(() => {
    console.log("user content:", userContent);
  }, [userContent]);
  
  // Handler for viewing a user's content
  console.log("activeUser:", activeUser);

  const handleViewContent = (userId) => {
    console.log("Clicked View Content for user:", userId);
    if (activeUser === userId) {
      setActiveUser(null); // Toggle off if the same user is clicked again
    } else {
      setActiveUser(userId); // Set the active user
      if (!userContent[userId]) {
        console.log("Dispatching content load for user:", userId);
        dispatch(onLoadUserContent(userId)); // Only load if not already loaded
      }
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
          {/* Conditional rendering of user content */}
          {activeUser === user.id && (
            <>
              {loadingContentByUser[user.id] ? (
                <div>Loading content...</div>
              ) : userContent[user.id] && userContent[user.id].length > 0 ? (
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
