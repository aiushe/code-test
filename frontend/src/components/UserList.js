import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from "styled-components";
import { onLoadDashboardUsers, onLoadUserContent, onApproveContent, onRejectContent } from '../redux/actions/dashboard-actions';

console.log("UserList component is being imported.");

// Styled components
const PageBackground = styled.div`
  background: #FFFFFF;
  min-height: 100vh;
  padding: 20px;
`;

const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 0 24px 30px;
  background: #FFFFFF;
  text-transform: uppercase;
  border-radius: 12px;
`;

const UserItem = styled.div`
  display: flex;
  flex-direction: column;
  background: #f0f0f0; /* Changed from gradient */
  border-radius: 20px;
  overflow: hidden;
  text-transform: uppercase;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease; /* Animation for interactivity */

  &:hover {
    transform: scale(1.02); /* Slight scale on hover for engagement */
  }
`;

const UserHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #f0f0f0; /* Changed */
  border-bottom: 1px solid #f0f0f0; /* Changed */
`;

const UserName = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #007aff;
  letter-spacing: 1px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
`;

const ViewContentButton = styled.button`
  padding: 10px 20px;
  background-color: #007aff;
  color: white;
  border: 2px solid #007aff;
  border-radius: 25px;
  cursor: pointer;
  font-weight: bold;
  text-transform: uppercase;
  transition: all 0.3s ease;

  &:hover {
    background-color: white;
    color: #007aff;
    border-color: #007aff;
  }

  &:disabled {
    background-color: #f0f0f0; /* Changed */
    border-color: #f0f0f0; /* Changed */
    color: #242F57; /* Changed to maintain contrast */
    cursor: not-allowed;
  }
`;

const UserContentWrapper = styled.div`
  padding: 20px;
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 25px;
  padding: 30px 24px;
  background: #f0f0f0; /* Already #f0f0f0, no change needed */
`;

const ContentItem = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(33.33% - 14px);
  background: #FFFFFF;
  padding: 12px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-5px); /* Slight lift on hover */
  }
`;

const ContentImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
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
  border-radius: 8px;
`;

const ImageUnderline = styled.div`
  width: 100%;
  height: 1px;
  background: #f0f0f0; /* Changed */
  margin: 10px 0;
`;

const ActionButton = styled.button`
  padding: 10px 20px;
  background: ${(props) => (props.approve ? "#007aff" : "#E9EDF7")};
  color: ${(props) => (props.approve ? "white" : "#007aff")};
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-weight: bold;
  text-transform: uppercase;
  transition: background-color 0.3s ease;

  &:hover {
    background: ${(props) => (props.approve ? "#1626B3" : "#D1D9ED")};
  }

  &:disabled {
    background: #f0f0f0; /* Changed */
    color: #242F57; /* Changed to maintain contrast */
    cursor: not-allowed;
  }
`;

const StatusBadge = styled.span`
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
  background: ${(props) => {
    switch (props.status) {
      case 'pending':
        return '#FFF186';
      case 'rejected':
        return '#FF8686';
      case 'approved':
        return '#D6F559';
      default:
        return '#f0f0f0'; /* Changed */
    }
  }};
  color: #242F57;
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1;
`;

const getUserDisplayName = (userId) => {
  if (typeof userId === 'string' && userId.length > 0) {
    return `USER ${userId.toUpperCase()}`;
  } else if (typeof userId === 'number') {
    return `USER ${String.fromCharCode(65 + ((userId - 1) % 26))}`;
  } else {
    return 'USER';
  }
};

const PageTitle = styled.h1`
  background: linear-gradient(135deg, #007aff, #00c6ff);
  color: #fff;
  padding: 50px;
  border-radius: 15px;
  text-align: center;
  margin: 0 20px 20px;
  font-size: 36px;
  text-transform: uppercase;
  width: calc(100% - 40px);
  box-sizing: border-box;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  }

  &::after {
    content: 'USER LIST  USER LIST  USER LIST  USER LIST  USER LIST  USER LIST  USER LIST  USER LIST  USER LIST  USER LIST';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    white-space: nowrap;
    animation: moveText 20s linear infinite;
  }

  @keyframes moveText {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }
`;

const UserListAndContent = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.dashboard.users);
  const loadingUsers = useSelector((state) => state.dashboard.isLoading);
  const [activeUser, setActiveUser] = useState(null);
  const [localContent, setLocalContent] = useState({});
  const userContent = useSelector((state) => state.dashboard?.userContent?.[activeUser] || []);
  const loadingContentByUser = useSelector((state) => state.dashboard?.loadingContentByUser?.[activeUser] || false);
  const loadingContentItems = useSelector((state) => state.dashboard.loadingContentItems) || {};

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

  const handleApprove = (contentId) => {
    dispatch(onApproveContent(activeUser, contentId));
    setLocalContent(prevContent => ({
      ...prevContent,
      [activeUser]: prevContent[activeUser].map(item =>
        item.id === contentId ? { ...item, status: 'approved' } : item
      )
    }));
  };

  const handleReject = (contentId) => {
    console.log(`Reject button clicked for content ID: ${contentId}`);
    dispatch(onRejectContent(activeUser, contentId));
    setLocalContent(prevContent => ({
      ...prevContent,
      [activeUser]: prevContent[activeUser].map(item =>
        item.id === contentId ? { ...item, status: 'rejected' } : item
      )
    }));
  };

  useEffect(() => {
    if (activeUser && userContent) {
      setLocalContent(prevContent => ({
        ...prevContent,
        [activeUser]: userContent.map(item => ({
          ...item,
          status: item.status || 'pending'
        }))
      }));
    }
  }, [activeUser, userContent]);

  const renderActionButton = (item) => {
    switch(item.status) {
      case 'pending':
        return (
          <>
            <ActionButton
              approve
              onClick={() => handleApprove(item.id)}
              disabled={loadingContentItems[item.id]}
            >
              {loadingContentItems[item.id] ? 'APPROVING...' : 'APPROVE'}
            </ActionButton>
            <ActionButton
              reject
              onClick={() => handleReject(item.id)}
              disabled={loadingContentItems[item.id]}
            >
              {loadingContentItems[item.id] ? 'REJECTING...' : 'REJECT'}
            </ActionButton>
          </>
        );
      case 'approved':
        return (
          <ActionButton
            onClick={() => handleReject(item.id)}
            disabled={loadingContentItems[item.id]}
          >
            {loadingContentItems[item.id] ? 'REJECTING...' : 'REJECT'}
          </ActionButton>
        );
      case 'rejected':
        return (
          <ActionButton
            approve
            onClick={() => handleApprove(item.id)}
            disabled={loadingContentItems[item.id]}
          >
            {loadingContentItems[item.id] ? 'APPROVING...' : 'APPROVE'}
          </ActionButton>
        );
      default:
        return null;
    }
  };

  if (loadingUsers) {
    return <PageBackground><div>LOADING USERS...</div></PageBackground>;
  }

  return (
    <PageBackground>
      <PageTitle> </PageTitle>
      <UserContainer>
        {users.map((user) => (
          <UserItem key={user.id}>
            <UserHeader>
              <UserName>{getUserDisplayName(user.id)}</UserName>
              <ViewContentButton
                onClick={() => handleViewContent(user.id)}
                disabled={loadingContentByUser && loadingContentByUser[user.id]}
              >
                {activeUser === user.id ? "HIDE CONTENT" : "VIEW CONTENT"}
              </ViewContentButton>
            </UserHeader>
            {activeUser === user.id && (
              <UserContentWrapper>
                {loadingContentByUser ? (
                  <div>LOADING CONTENT...</div>
                ) : localContent[activeUser]?.length > 0 ? (
                  <ContentContainer>
                    {localContent[activeUser].slice(0, 3).map((item) => (
                      <ContentItem key={item.id}>
                        <ImageContainer>
                          <StatusBadge status={item.status}>{item.status.toUpperCase()}</StatusBadge>
                          {Array.isArray(item.urls) && item.urls.length > 0 ? (
                            <ContentImage src={item.urls[0]} alt={`Content ${item.id}`} />
                          ) : item.url ? (
                            <ContentImage src={item.url} alt={`Content ${item.id}`} />
                          ) : null}
                          <UserName>{getUserDisplayName(user.id)}</UserName>
                        </ImageContainer>
                        <ImageUnderline />
                        <ContentInfo>
                          {renderActionButton(item)}
                        </ContentInfo>
                      </ContentItem>
                    ))}
                  </ContentContainer>
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