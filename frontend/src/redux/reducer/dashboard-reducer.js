import { DashboardActions } from "../action-types/dashboard-action-types";

const initialState = {
  users: [],
  userContent: {}, // Stores content for each user by userId
  loadingUsers: false, // Loading state for fetching users
  loadingContentByUser: {}, // Loading state for fetching content per user
  error: null, // Global error state for handling API errors
  loadingContentItems: {}, // Loading state for individual content items
};

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    // Set users after fetching them
    case DashboardActions.SET_USERS:
      return {
        ...state,
        users: action.payload,
        error: null, // Reset error on successful user fetch
      };

    // Set loading state for users
    case DashboardActions.SET_LOADING_USERS:
      return {
        ...state,
        loadingUsers: action.payload,
      };

    // Set user-specific content
    case DashboardActions.SET_USER_CONTENT:
      return {
        ...state,
        userContent: {
          ...state.userContent,
          [action.payload.userId]: action.payload.content,
        },
        error: null, // Reset error on successful content fetch
      };

    // Set loading state for specific user's content
    case DashboardActions.SET_LOADING_CONTENT:
      return {
        ...state,
        loadingContentByUser: {
          ...state.loadingContentByUser,
          [action.payload.userId]: action.payload.loading,
        },
      };

    // Set loading state for individual content items
    case DashboardActions.SET_LOADING_CONTENT_ITEM:
      return {
        ...state,
        loadingContentItems: {
          ...state.loadingContentItems,
          [action.payload.contentId]: action.payload.loading,
        },
      };

    // Handle errors in the state
    case DashboardActions.SET_ERROR:
      return {
        ...state,
        error: action.payload, // Capture error message
      };

    // Update content item status
    case DashboardActions.UPDATE_CONTENT_ITEM:
      return {
        ...state,
        userContent: {
          ...state.userContent,
          [action.payload.userId]: state.userContent[action.payload.userId].map(item =>
            item.id === action.payload.contentId
              ? { ...item, status: action.payload.status }
              : item
          ),
        },
      };

    default:
      return state;
  }
};

export default dashboardReducer;