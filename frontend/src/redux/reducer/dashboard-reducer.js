import { DashboardActions } from "../action-types/dashboard-action-types";

const initialState = {
  users: [],
  userContent: {},  // Initialize user content
  loadingContentByUser: {},  // Initialize loading states for content by user
  loadingContentItems: {},  // Initialize loading states for content items (approve/reject)
  isLoading: false,  // Initialize loading state for dashboard
};

// eslint-disable-next-line import/no-anonymous-default-export
// Reducer is used to manage the state of the dashboard
// It takes the initial state and the action and returns the new state
export default (state = initialState, action) => {
  console.log("Reducer triggered with action:", action);
  switch (action.type) {
    // Set the users in the dashboard
    // It updates the users in the dashboard by setting the users state to the payload.
    case DashboardActions.SET_USERS:
      console.log("Setting users in the dashboard:", action.payload);
      return {
        ...state,
        users: action.payload,  // Set the users in the dashboard
      };
    // Set the loading state for users
    // It updates the loading state for users in the dashboard by setting the isLoading state to the payload.
    case DashboardActions.SET_LOADING_USERS:
      console.log("Setting loading state for users in the dashboard:", action.payload);
      return {
        ...state,
      isLoading: action.payload,  // Update loading state
    };
    // Set the user content in the dashboard
    // It updates the user content in the dashboard by mapping over the content and storing the content by user ID.
    case DashboardActions.SET_USER_CONTENT:
      console.log("Setting user content in the dashboard:", action.payload);
      return {
        ...state,
        userContent: {
          ...state.userContent,
          [action.payload.userId]: action.payload.content, // Store content by userId
        },
      };
    // Set the loading state for content by user
    // It updates the loading state for content by user in the dashboard by mapping over the loading content by user and updating the loading state of the content item that matches the user ID.
    case DashboardActions.SET_LOADING_CONTENT_BY_USER:
      console.log("Setting loading state for content by user in the dashboard:", action.payload);
      return {
        ...state,
        loadingContentByUser: {
          ...state.loadingContentByUser,
          [action.payload.userId]: action.payload.loading, // Track loading state by userId
        },
      };
      // Approve content for a specific user
      // It updates the user content in the dashboard by mapping over the content and updating the status of the content item that matches the content ID
      // and the user ID. If the content item is not found, it returns the original content item.
      case DashboardActions.APPROVE_CONTENT:
        console.log("Approving content for user in the dashboard:", action.payload);
        return {
          ...state,
          userContent: {
            ...state.userContent,
            [action.payload.userId]: state.userContent[action.payload.userId].map((content) => // Update the user content in the dashboard
              content.id === action.payload.contentId
                ? { ...content, status: "approved" }
                : content
            ),
          },
        };
      // Reject content for a specific user
      // It updates the user content in the dashboard by mapping over the content and updating the status of the content item that matches the content ID
      // and the user ID. If the content item is not found, it returns the original content item.
      case DashboardActions.REJECT_CONTENT:
        console.log("Rejecting content for user in the dashboard:", action.payload);
        return {
          ...state,
          userContent: {
            ...state.userContent,
            [action.payload.userId]: state.userContent[action.payload.userId].map((content) =>
              content.id === action.payload.contentId // Update the user content in the dashboard
                ? { ...content, status: "rejected" }
                : content
            ),
          },
        };
      // Set the loading state for content items
      // It updates the loading state for content items in the dashboard by mapping over the loading content items and updating the loading state of the content item that matches the content ID.
      case DashboardActions.SET_LOADING_CONTENT_ITEM:
        console.log("Setting loading state for content item in the dashboard:", action.payload);
        return {
          ...state,
          loadingContentItems: {
            ...state.loadingContentItems,
            [action.payload.contentId]: action.payload.loading, // Update the loading state for content items
          },
        };
    // Reset the dashboard state to initial values
    case DashboardActions.RESET_STATE:
      console.log("Resetting dashboard state to initial values");
      return initialState;
    default:
      console.log("Default case in the dashboard reducer");
      return state;
  }
};
