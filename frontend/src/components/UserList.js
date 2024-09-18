import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onLoadDashboardUsers, onLoadUserContent } from "../redux/actions/dashboardActions";
import styled from "styled-components";
import UserContent from "./UserContent";

const UserContainer = styled.div`
  margin: 20px;
`;

const UserItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #eee;
`;

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

const UserList = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.dashboard.users);
  const userContent = useSelector((state) => state.dashboard.userContent);
  const loadingUsers = useSelector((state) => state.dashboard.loadingUsers);
  const loadingContentByUser = useSelector((state) => state.dashboard.loadingContentByUser);

  const [activeUser, setActiveUser] = useState(null);

  useEffect(() => {
    console.log("user content:", userContent);
  }, [userContent]);
  

  const handleViewContent = (userId) => {
    if (activeUser === userId) {
      setActiveUser(null); // Toggle off if the same user is clicked again
    } else {
      setActiveUser(userId); // Set the active user
      if (!userContent[userId]) {
        dispatch(onLoadUserContent(userId)); // Only load if not already loaded
      }
    }
  };

  if (loadingUsers) {
    return <div>Loading users...</div>;
  }

  return (
    <UserContainer>
      <h2>Users</h2>
      {users.map((user) => (
        <div key={user.id}>
          <UserItem>
            <div>{user.name}</div>
            <ViewContentButton
              onClick={() => handleViewContent(user.id)}
              disabled={loadingContentByUser[user.id]} // Disable button while loading for this user
            >
              {activeUser === user.id ? "Hide Content" : "View Content"}
            </ViewContentButton>
          </UserItem>
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
