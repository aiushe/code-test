import { getUsers, getUserContent, approveContent, rejectContent } from "../../services/user.service";
import { DashboardActions } from "../action-types/dashboard-action-types";

// Load all users
// It dispatches the action to set the loading state for the users
// and then calls the getUsers function from the user service
// to get all the users.
// If the users are successfully fetched, it dispatches the action to set the users.
// If there is an error, it logs the error and dispatches the action to set the users to an empty array.
// Finally, it dispatches the action to set the loading state for the users to false.
export const onLoadDashboardUsers = () => async (dispatch) => {
  console.log("Action triggered to load dashboard users");
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
// It dispatches the action to set the loading state for the content by user
// and then calls the getUserContent function from the user service
// to get the content for the specified user.
// If the content is successfully fetched, it dispatches the action to set the content.
// If there is an error, it logs the error and dispatches the action to set the content to an empty array.
// Finally, it dispatches the action to set the loading state for the content by user to false.
export const onLoadUserContent = (userId) => async (dispatch) => {
  console.log(`Action triggered for user: ${userId}`);
  dispatch({ type: DashboardActions.SET_LOADING_CONTENT_BY_USER, payload: { userId, loading: true } });
  try {
    const response = await getUserContent(userId);
    dispatch({ type: DashboardActions.SET_USER_CONTENT, payload: { userId, content: response.data } });
  } catch (error) {
    console.error(`Error fetching content for user ${userId}:`, error);
    dispatch({ type: DashboardActions.SET_USER_CONTENT, payload: { userId, content: [] } });  // Empty content on error
  } finally {
    dispatch({ type: DashboardActions.SET_LOADING_CONTENT_BY_USER, payload: { userId, loading: false } });
  }
};

// Function is used to approve content for a specific user
// It dispatches the action to set the loading state for the content item
// and then calls the approveContent function from the user service
// to approve the content for the specified user and content ID.
// If the approval is successful, it dispatches the action to approve the content.
// If there is an error, it logs the error and dispatches the action to set the loading state for the content item to false.
// Finally, it dispatches the action to set the loading state for the content item to false.
export const onApproveContent = (userId, contentId) => async (dispatch) => {
  console.log(`Action triggered to approve content for user: ${userId}, contentId: ${contentId}`);
  dispatch({ type: DashboardActions.SET_LOADING_CONTENT_ITEM, payload: { contentId, loading: true } });
  try {
    await approveContent(userId, contentId);  // Call the API
    dispatch({ type: DashboardActions.APPROVE_CONTENT, payload: { userId, contentId } });
  } catch (error) {
    console.error(`Error approving content for user ${userId}:`, error);
  } finally {
    dispatch({ type: DashboardActions.SET_LOADING_CONTENT_ITEM, payload: { contentId, loading: false } });
  }
};

// Reject content for a specific user
// It dispatches the action to set the loading state for the content item
// and then calls the rejectContent function from the user service
// to reject the content for the specified user and content ID.
// If the rejection is successful, it dispatches the action to reject the content.
// If there is an error, it logs the error and dispatches the action to set the loading state for the content item to false.
// Finally, it dispatches the action to set the loading state for the content item to false.
export const onRejectContent = (userId, contentId) => async (dispatch) => {
  console.log(`Action triggered to reject content for user: ${userId}, contentId: ${contentId}`);
  dispatch({ type: DashboardActions.SET_LOADING_CONTENT_ITEM, payload: { contentId, loading: true } });
  try {
    await rejectContent(userId, contentId);  // Call the API
    dispatch({ type: DashboardActions.REJECT_CONTENT, payload: { userId, contentId } });
  } catch (error) {
    console.error(`Error rejecting content for user ${userId}:`, error);
  } finally {
    dispatch({ type: DashboardActions.SET_LOADING_CONTENT_ITEM, payload: { contentId, loading: false } });
  }
};