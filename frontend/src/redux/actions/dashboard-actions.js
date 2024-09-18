import { getUsers, getUserContent, approveContent, rejectContent } from "../../services/user.service"; 
import { DashboardActions } from "../action-types/dashboard-action-types";

// Load all users
export const onLoadDashboardUsers = () => async (dispatch) => {
  dispatch({ type: DashboardActions.SET_LOADING_USERS, payload: true });
  try {
    const response = await getUsers();
    dispatch({ type: DashboardActions.SET_USERS, payload: response.data });
  } catch (error) {
    console.error("Error fetching users:", error);
    dispatch({ type: DashboardActions.SET_USERS, payload: [] });  // Empty users on error
    dispatch({ type: DashboardActions.SET_ERROR, payload: "Failed to load users" });  // Optional error handling in Redux
  } finally {
    dispatch({ type: DashboardActions.SET_LOADING_USERS, payload: false });
  }
};

// Load content for a specific user
export const onLoadUserContent = (userId) => async (dispatch, getState) => {
  // Get the state and check if content is already loaded for the user
  const { dashboard } = getState();
  const existingContent = dashboard.userContent[userId];
  
  if (existingContent) {
    return; // Skip loading if content is already loaded
  }

  dispatch({ 
    type: DashboardActions.SET_LOADING_CONTENT, 
    payload: { userId, loading: true }
  });
  
  try {
    const response = await getUserContent(userId);
    dispatch({ 
      type: DashboardActions.SET_USER_CONTENT, 
      payload: { userId, content: response.data } 
    });
  } catch (error) {
    console.error('Error fetching user content:', error);
    dispatch({ type: DashboardActions.SET_ERROR, payload: `Failed to load content for user ${userId}` });
  } finally {
    dispatch({ 
      type: DashboardActions.SET_LOADING_CONTENT, 
      payload: { userId, loading: false } 
    });
  }
};

// Approve content
export const onApproveContent = (userId, contentId) => async (dispatch) => {
  dispatch({ type: DashboardActions.SET_LOADING_CONTENT_ITEM, payload: { contentId, loading: true } });
  try {
    await approveContent(userId, contentId);
    dispatch({
      type: DashboardActions.UPDATE_CONTENT_ITEM,
      payload: { userId, contentId, status: 'approved' }
    });
  } catch (error) {
    console.error('Error approving content:', error);
    dispatch({ type: DashboardActions.SET_ERROR, payload: `Failed to approve content for user ${userId}` });
  } finally {
    dispatch({ type: DashboardActions.SET_LOADING_CONTENT_ITEM, payload: { contentId, loading: false } });
  }
};

// Reject content
export const onRejectContent = (userId, contentId) => async (dispatch) => {
  dispatch({ type: DashboardActions.SET_LOADING_CONTENT_ITEM, payload: { contentId, loading: true } });
  try {
    await rejectContent(userId, contentId);
    dispatch({
      type: DashboardActions.UPDATE_CONTENT_ITEM,
      payload: { userId, contentId, status: 'rejected' }
    });
  } catch (error) {
    console.error('Error rejecting content:', error);
    dispatch({ type: DashboardActions.SET_ERROR, payload: `Failed to reject content for user ${userId}` });
  } finally {
    dispatch({ type: DashboardActions.SET_LOADING_CONTENT_ITEM, payload: { contentId, loading: false } });
  }
};

// Additional action (template for any other actions you need)
export const someOtherUserContentAction = (userId) => async (dispatch) => {
  dispatch({ type: DashboardActions.SET_LOADING_CONTENT, payload: { userId, loading: true } });
  try {
    const response = await getUserContent(userId);
    // Dispatch the relevant action to update content
    dispatch({
      type: DashboardActions.SET_USER_CONTENT,
      payload: { userId, content: response.data }
    });
  } catch (error) {
    console.error('Error with some other action:', error);
    dispatch({ type: DashboardActions.SET_ERROR, payload: `Failed to perform some action for user ${userId}` });
  } finally {
    dispatch({ type: DashboardActions.SET_LOADING_CONTENT, payload: { userId, loading: false } });
  }
};
