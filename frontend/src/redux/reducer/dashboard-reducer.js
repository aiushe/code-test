import { DashboardActions } from "../action-types/dashboard-action-types";

const initialState = {
  users: [],
  userContent: {},
  loading: false,
  loadingContent: false, 
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case DashboardActions.SET_USERS:
      return {
        ...state,
        users: action.payload,
      };

    case DashboardActions.SET_LOADING_USERS:
      return {
        ...state,
        loading: action.payload,
      };

    case DashboardActions.SET_USER_CONTENT:
      return {
        ...state,
        userContent: {
          ...state.userContent,
          [action.payload.userId] : action.payload.content,
        },
      };

    case DashboardActions.SET_LOADING_CONTENT:
      return {
        ...state,
        loadingContent: action.payload,
      };

    case DashboardActions.APPROVE_CONTENT: {
      const { userId, contentId } = action.payload;
      return {
        ...state,
        userContent: {
          ...state.userContent,
          [userId]: state.userContent[userId].map((content) =>
            content.id === contentId ? { ...content, status: "approved" } : content
          ),
        },
      };
    }

    case DashboardActions.REJECT_CONTENT: {
      const { userId, contentId } = action.payload;
      return {
        ...state,
        userContent: {
          ...state.userContent,
          [userId]: state.userContent[userId].map((content) =>
            content.id === contentId ? { ...content, status: "rejected" } : content
          ),
        },
      };
    }

    case DashboardActions.RESET_STATE:
      return initialState;
   
      default:
      return state;
  }
};
