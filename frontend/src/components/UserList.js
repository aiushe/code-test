import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onLoadDashboardUsers, onLoadUserContent, onApproveContent, onRejectContent } from "../redux/actions/dashboard-actions";
import styled from "styled-components";

console.log("UserListAndContent component is being imported.");

// Styled components
const PageBackground = styled.div`
  background-color: #FFFFFF;
  min-height: 100vh;
  padding: 20px;
`;

const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 30px 24px;
  background-color: #FFFFFF;
  text-transform: uppercase;
  border-radius: 8px;
`;

const UserItem = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #E0E0E0;
  border-radius: 20px;
  overflow: hidden;
  text-transform: uppercase;
`;

const UserHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #E0E0E0;
  border-bottom: 1px solid #E0E0E0;
`;

const ViewContentButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-weight: bold;
  text-transform: uppercase;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
  }
`;

const UserContentWrapper = styled.div`
  padding: 20px;
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 25px;
  padding: 30px 24px;
  background-color: #e0e0e0;
`;

const ContentItem = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(33.33% - 14px);
  background-color: #ffffff;
  padding: 12px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const ContentImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
`;

const ContentInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 350px;
  margin-bottom: 10px;
  overflow: hidden;
  position: relative;
  border-radius: 10px;
`;

const ImageUnderline = styled.div`
  width: 100%;
  height: 1px;
  background-color: #E0E0E0;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const ActionButton = styled.button`
  padding: 10px 20px;
  background-color: ${(props) => (props.approve ? "#1C33EE" : "#E9EDF7")};
  color: ${(props) => (props.approve ? "white" : "#1C33EE")};
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-weight: bold;
  text-transform: uppercase;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.approve ? "#1626B3" : "#D1D9ED")};
  }

  &:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
  }
`;

const StatusBadge = styled.span`
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
  background-color: ${props => {
    switch (props.status) {
      case 'pending': return '#FFF186';
      case 'rejected': return '#FF8686';
      case 'approved': return '#D6F559';
      default: return '#6c757d';
    }
  }};
  color: #242F57;
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1;
`;

const UserName = styled.span`
  font-size: 14px;
  font-weight: bold;
  color: #ffffff;
  position: absolute;
  bottom: 8px;
  left: 8px;
  z-index: 1;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
  text-transform: uppercase;
`;

const getUserDisplayName = (userId) => {
  if (typeof userId === 'string' && userId.length > 0) {
    return `USER ${userId.toUpperCase()}`;
  } else if (typeof userId === 'number') {
    return `USER ${String.fromCharCode(65 + (userId % 26))}`;
  } else {
    return 'USER';
  }
};

const UserContent = ({ userId, userName, content }) => {
  const dispatch = useDispatch();
  const loadingContentItems = useSelector((state) => state.dashboard.loadingContentItems) || {};

  const handleApprove = (contentId) => {
    dispatch(onApproveContent(userId, contentId));
  };

  const handleReject = (contentId) => {
    dispatch(onRejectContent(userId, contentId));
  };

  return (
    <ContentContainer>
      {content.slice(0, 3).map((item) => (
        <ContentItem key={item.id}>
          <ImageContainer>
            <StatusBadge status={item.status}>{item.status.toUpperCase()}</StatusBadge>
            {Array.isArray(item.urls) && item.urls.length > 0 ? (
              <ContentImage src={item.urls[0]} alt={`Content ${item.id}`} />
            ) : item.url ? (
              <ContentImage src={item.url} alt={`Content ${item.id}`} />
            ) : null}
            <UserName>{userName}</UserName>
          </ImageContainer>
          <ImageUnderline />
          <ContentInfo>
            {item.status === 'pending' && (
              <>
                <ActionButton
                  approve
                  onClick={() => handleApprove(item.id)}
                  disabled={loadingContentItems[item.id]}
                >
                  {loadingContentItems[item.id] ? 'APPROVING...' : 'APPROVE'}
                </ActionButton>
                <ActionButton
                  onClick={() => handleReject(item.id)}
                  disabled={loadingContentItems[item.id]}
                >
                  {loadingContentItems[item.id] ? 'REJECTING...' : 'REJECT'}
                </ActionButton>
              </>
            )}
            {item.status === 'approved' && (
              <ActionButton
                onClick={() => handleReject(item.id)}
                disabled={loadingContentItems[item.id]}
              >
                {loadingContentItems[item.id] ? 'REJECTING...' : 'REJECT'}
              </ActionButton>
            )}
            {item.status === 'rejected' && (
              <ActionButton
                approve
                onClick={() => handleApprove(item.id)}
                disabled={loadingContentItems[item.id]}
              >
                {loadingContentItems[item.id] ? 'APPROVING...' : 'APPROVE'}
              </ActionButton>
            )}
          </ContentInfo>
        </ContentItem>
      ))}
    </ContentContainer>
  );
};

const UserListAndContent = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.dashboard.users);
  const userContent = useSelector((state) => state.dashboard.userContent);
  const loadingUsers = useSelector((state) => state.dashboard.isLoading);
  const loadingContentByUser = useSelector((state) => state.dashboard.loadingContentByUser);
  const [activeUser, setActiveUser] = useState(null);

  useEffect(() => {
    dispatch(onLoadDashboardUsers());
  }, [dispatch]);

  const handleViewContent = (userId) => {
    if (activeUser === userId) {
      setActiveUser(null);
    } else {
      setActiveUser(userId);
      dispatch(onLoadUserContent(userId));
    }
  };  

  if (loadingUsers) {
    return <PageBackground><div>LOADING USERS...</div></PageBackground>;
  }
  
  return (
    <PageBackground>
      <UserContainer>
        {users.map((user) => (
          <UserItem key={user.id}>
            <UserHeader>
              <div>{getUserDisplayName(user.id)}</div>
              <ViewContentButton
                onClick={() => handleViewContent(user.id)}
                disabled={loadingContentByUser && loadingContentByUser[user.id]}
              >
                {activeUser === user.id ? "HIDE CONTENT" : "VIEW CONTENT"}
              </ViewContentButton>
            </UserHeader>
            {activeUser === user.id && (
              <UserContentWrapper>
                {loadingContentByUser[user.id] ? (
                  <div>LOADING CONTENT...</div>
                ) : userContent[user.id] ? (
                  <UserContent
                    userId={user.id}
                    userName={getUserDisplayName(user.id)}
                    content={userContent[user.id]}
                  />
                ) : (
                  <div>NO CONTENT AVAILABLE FOR THIS USER.</div>
                )}
              </UserContentWrapper>
            )}
          </UserItem>
        ))}
      </UserContainer>
    </PageBackground>
  );
};

export default UserListAndContent;
