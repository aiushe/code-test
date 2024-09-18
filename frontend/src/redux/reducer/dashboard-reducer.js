import { DashboardActions } from "../action-types/dashboard-action-types";

const initialState = {
  users: [],
  userContent: {},
  loading: false,
  loadingContent: false,
};

const dashboardReducer = (state = initialState, action) => {
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
          [action.payload.userId]: action.payload.content,
        },
      };
    case DashboardActions.SET_LOADING_CONTENT:
      return {
        ...state,
        loadingContent: action.payload,
      };
    default:
      return state;
  }
};

export default dashboardReducer;