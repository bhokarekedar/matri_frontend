import { ERROR_OCCURED, REMOVE_ERROR, UPDATE_IS_LOADING } from "./configActionTypes";

const configInitialSate = {
  isLoading: [],
  isError: false,
  errorData: "",
  last_refresh_date: "",
  username: "",
  isAutherised: false,
  isAdmin: false,
};

export const configReducer = (state = configInitialSate, action) => {
  switch (action.type) {
    case UPDATE_IS_LOADING:
      let newIsloading = [...state.isLoading];
      if (action.payload) {
        newIsloading.push(true);
      } else {
        newIsloading.pop();
      }
      return {
        ...state,
        isLoading: [...newIsloading],
      };
    case ERROR_OCCURED:
      return {
        ...state,
        isError: true,
        errorData: action.response.error,
      };
    case REMOVE_ERROR:
      return {
        ...state,
        isError: false,
        errorData: "",
      };

    default:
      return state;
  }
};
