import { DashboardActions } from "../action-types/dashboard-action-types";

const initialState = {
  users: [],
  userContent: {},
  loadingContentByUser: {},
  loadingContentItems: {},
  isLoading: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  console.log("Reducer triggered with action:", action);
  switch (action.type) {
    case DashboardActions.SET_LOADING_USERS:
      return {
        ...state,
        isLoading: action.payload,
      };
    case DashboardActions.SET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case DashboardActions.SET_LOADING_CONTENT_BY_USER:
      return {
        ...state,
        loadingContentByUser: {
          ...state.loadingContentByUser,
          [action.payload.userId]: action.payload.isLoading,
        },
      };
    case DashboardActions.SET_USER_CONTENT:
      return {
        ...state,
        userContent: {
          ...state.userContent,
          [action.payload.userId]: action.payload.content,
        },
      };
    case DashboardActions.SET_LOADING_CONTENT_ITEM:
      return {
        ...state,
        loadingContentItems: {
          ...state.loadingContentItems,
          [action.payload.contentId]: action.payload.isLoading,
        },
      };
    case DashboardActions.UPDATE_CONTENT_STATUS_SUCCESS:
      return {
        ...state,
        userContent: {
          ...state.userContent,
          [action.payload.userId]: state.userContent[action.payload.userId].map(
            (item) =>
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
