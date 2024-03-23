import {
  SET_CURRENT_PAGE,
  UPDATE_CASTE_DETAILS,
  UPDATE_REGISRATION_ERROR,
  UPDATE_REGISRATION_LOCAL_DATA,
  UPDATE_RELIGION_DETAILS,
  UPDATE_SUB_RELIGION_DETAILS,
} from "./registrationActionTypes.js";
const initialState = {
  registerationInfo: {},
  registerationInfoErros: {},
  currentPage: 1,
  religions: [],
  subReligions: [],
  castes: [],
  other: null,
};

export const registrationReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_RELIGION_DETAILS:
      return {
        ...state,
        religions: action.payload,
      };
      case UPDATE_SUB_RELIGION_DETAILS:
        return {
          ...state,
          subReligions: action.payload,
        };
        case UPDATE_CASTE_DETAILS:
          return {
            ...state,
            castes: action.payload,
          };
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };
      case UPDATE_REGISRATION_LOCAL_DATA:
      
      return {
        ...state,
        registerationInfo: { ...state.registerationInfo, ...action.payload },
      };
    case UPDATE_REGISRATION_ERROR:
      return {
        ...state,
        registerationInfoErros: {
          ...state.registerationInfoErros,
          ...action.payload,
        },
      };

    default:
      return state;
  }
};
