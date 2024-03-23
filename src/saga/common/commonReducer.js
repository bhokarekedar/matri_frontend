import { UPDATE_AUTHETICATION, UPDATE_GENERAL_INFO, UPDATE_SAMPLE_ARRAY_DATA, UPDATE_USER_DATA } from "./commonActionTypes";

const initialState = {
  userData: {},
  generalInfo: {}, 
  sampleArrayData: [],
  isAutherised: false,
};

export const commonReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_GENERAL_INFO:
      return {
        ...state,
        generalInfo: { ...action.payload },
      };
    case UPDATE_USER_DATA:
      return {
        ...state,
        userData: { ...action.payload },
      };
    case UPDATE_SAMPLE_ARRAY_DATA:
      return {
        ...state,
        sampleArrayData: [...action.payload],
      };
    case UPDATE_AUTHETICATION:
      return {
        ...state,
        isAutherised: action.payload,
      };
    default:
      return state;
  }
};
