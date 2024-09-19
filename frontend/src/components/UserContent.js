import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { onApproveContent, onRejectContent } from "../redux/actions/dashboard-actions";

// Styled components for consistent UI
const ContentContainer = styled.div`
  margin-top: 10px;
  padding: 15px;
  border: 1px solid #ddd;
`;

// Styled item for displaying content
const ContentItem = styled.div`
  margin-bottom: 10px;
`;

// Reusable button component with dynamic styling based on action type
const ActionButton = styled.button`
  margin-right: 10px;
  padding: 5px 10px;
  background-color: ${(props) => (props.approve ? "#28a745" : "#dc3545")};
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.approve ? "#218838" : "#c82333")};
  }

  &:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
  }
`;

// Component to display and manage user content
// userId: ID of the user
// content: Array of content items to display
const UserContent = ({ userId, content }) => {
  const dispatch = useDispatch();
  
  // Get loading state for content items from Redux store
  console.log("userId:", userId);
  console.log("content:", content);

  const loadingContentItems = useSelector((state) => state.dashboard.loadingContentItems);

  // Handler for approving content
  const handleApprove = (contentId) => {
    console.log("userId:", userId);
    console.log("contentId:", contentId);
    console.log("loadingContentItems:", loadingContentItems);
    dispatch(onApproveContent(userId, contentId));
  };

  // Handler for rejecting content
  const handleReject = (contentId) => {
    console.log("userId:", userId);
    console.log("contentId:", contentId);
    console.log("loadingContentItems:", loadingContentItems);
    dispatch(onRejectContent(userId, contentId));
  };

  // Render the content items
  console.log("content:", content);

  return (
    <ContentContainer>
      {content.map((item) => (
        <ContentItem key={item.id}>
          <p>{item.text}</p>
          <p>{item.status}</p>
          <p>{item.id}</p>
          {/* Approve button with dynamic text and disabled state */}
          <ActionButton
            approve
            onClick={() => handleApprove(item.id)}
            disabled={loadingContentItems[item.id]}
          >
            {loadingContentItems[item.id] ? 'Approving...' : 'Approve'}
          </ActionButton>
          {/* Reject button with dynamic text and disabled state */}
          <ActionButton
            onClick={() => handleReject(item.id)}
            disabled={loadingContentItems[item.id]}
          >
            {loadingContentItems[item.id] ? 'Rejecting...' : 'Reject'}
          </ActionButton>
        </ContentItem>
      ))}
    </ContentContainer>
  );
};

export default UserContent;