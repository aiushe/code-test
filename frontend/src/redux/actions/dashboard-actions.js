import { getUsers, getUserContent, approveContent, rejectContent } from "../../services/user.service"; 
import { DashboardActions } from "../action-types/dashboard-action-types";

// load all users
export const onLoadDashboardUsers = () => async (dispatch) => {
  dispatch({ type: DashboardActions.SET_LOADING_USERS, payload: true });
  try {
    const response = await getUsers();
    dispatch({ type: DashboardActions.SET_USERS, payload: response.data });
  } catch (error) {
    console.error("Error fetching users:", error);
  } finally {
    dispatch({ type: DashboardActions.SET_LOADING_USERS, payload: false });
  }
};

// load content 
export const onLoadUserContent = (userId) => async (dispatch) => {
  dispatch({ type: DashboardActions.SET_LOADING_CONTENT, payload: true });
  try {
    const response = await getUserContent(userId);
    dispatch({ 
      type: DashboardActions.SET_USER_CONTENT, 
      payload: { userId, content: response.data } 
    });
  } catch (error) {
    console.error('Error fetching user content:', error);
  } finally {
    dispatch({ type: DashboardActions.SET_LOADING_CONTENT, payload: false });
  }
};

//approve content
export const onApproveContent = (userId, contentId) => async (dispatch) => {
  try {
    await approveContent(userId, contentId);
    dispatch(onLoadUserContent(userId));
  } catch (error) {
    console.error('Error approving content:', error);
  }
};

// reject content
export const onRejectContent = (userId, contentId) => async (dispatch) => {
  try {
    await rejectContent(userId, contentId);
    dispatch(onLoadUserContent(userId));
  } catch (error) {
    console.error('Error rejecting content:', error);
  }
};

// Check if there are any other actions using the old URL format
export const someOtherUserContentAction = (userId) => async (dispatch) => {
  // Look for and update any calls using the old format
  const response = await getUserContent(userId);
  // ...
};
