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

// user content section
const UserContent = styled.div`
  background-color: #f9f9f9;
  padding: 10px;
  margin-top: 10px;
`;

const UserList = () => {
  const dispatch = useDispatch();
  
  // get users and loading state from Redux
  const users = useSelector((state) => state.dashboard.users);
  const userContent = useSelector((state) => state.dashboard.userContent);

  const loading = useSelector((state) => state.dashboard.loading);
  const loadingContent = useSelector((state) => state.dashboard.loadingContent);

  //track active content
  const [activeUser, setActiveUser] = useState(null);

  // load users
  useEffect(() => {
    dispatch(onLoadDashboardUsers());
  }, [dispatch]);

  // "View Content" button click
  const handleViewContent = (userId) => {
    setActiveUser(userId);
    dispatch(onLoadUserContent(userId));
  };

  //loading message
  if (loading) {
    return <div>loading users...</div>;
  }

  // display list of users
  return (
    <div>
      {users && users.length > 0 ? (
        users.map((user) => (
          <div key={user.id}>
            <UserItem>
              <div>{user.name}</div>
              <ViewContentButton onClick={() => handleViewContent(user.id)}>
                View Content
              </ViewContentButton>
            </UserItem>

            {/* show user content if this user's content is active */}
            {activeUser === user.id && userContent[user.id] && (
              <UserContent>
                {loadingContent ? (
                  <div>loading content...</div>
                ) : (
                  userContent[user.id].map((contentItem) => (
                    <div key={contentItem.id}>
                      <div>{contentItem.title}</div>
                      {/* Approve and Reject buttons will go here */}
                    </div>
                  ))
                )}
              </UserContent>
            )}
          </div>
        ))
      ) : (
        <div>No users found</div>
      )}
    </div>
  );
};

export default UserList;
