import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { onApproveContent, onRejectContent } from "../redux/actions/dashboardActions";

const ContentContainer = styled.div`
  margin-top: 10px;
  padding: 15px;
  border: 1px solid #ddd;
`;

const ContentItem = styled.div`
  margin-bottom: 10px;
`;

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

const UserContent = ({ userId, content }) => {
  const dispatch = useDispatch();
  
  const loadingContentItems = useSelector((state) => state.dashboard.loadingContentItems);

  const handleApprove = (contentId) => {
    dispatch(onApproveContent(userId, contentId));
  };

  const handleReject = (contentId) => {
    dispatch(onRejectContent(userId, contentId));
  };

  return (
    <ContentContainer>
      {content.map((item) => (
        <ContentItem key={item.id}>
          <p>{item.text}</p>
          <ActionButton
            approve
            onClick={() => handleApprove(item.id)}
            disabled={loadingContentItems[item.id]}
          >
            {loadingContentItems[item.id] ? 'Approving...' : 'Approve'}
          </ActionButton>
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