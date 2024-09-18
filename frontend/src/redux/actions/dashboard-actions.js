import { getUserContent, approveContent, rejectContent } from "../../services/user.service";
import { DashboardActions } from "../action-types/dashboard-action-types";

export const onLoadDashboardUsers = (userId) => async (dispatch) => {
  try {
    dispatch({ type: DashboardActions.SET_LOADING_USERS, payload: true });
    
    //get user content from backend
    const response = await getUserContent(userId);

    dispatch({ 
      type: DashboardActions.SET_USER_CONTENT, 
      payload: {userId, content: response.data}, 
    });
  } catch (error) {
    console.error(error);
  } finally {
    dispatch({ type: DashboardActions.SET_LOADING_USERS, payload: false });
  }
};

//accept user
export const onApproveContent = (userId, contentId) => async (dispatch) => {
  try {
    await approveContent(userId, contentId);
    dispatch({ 
      type: DashboardActions.APPROVE_CONTENT, 
      payload: {userId, contentId}
    });
  } catch (error) {
    console.error(error);
  }
};

//reject user
export const onRejectContent = (userId, contentId) => async (dispatch) => {
  try {
    await rejectContent(userId, contentId);
    dispatch({ 
      type: DashboardActions.REJECT_CONTENT, 
      payload: {userId, contentId}
    });
  } catch (error) {
    console.error(error);
  }
};
