import {
  AFTER_LOGIN_ERROR,
  SET_CURRENT_PAGE,
  UPDATE_CASTE_DETAILS,
  UPDATE_LOGIN_DATA,
  UPDATE_LOGIN_ERROR,
  UPDATE_LOGIN_LOCAL_DATA,
  UPDATE_REGISRATION_ERROR,
  UPDATE_REGISRATION_LOCAL_DATA,
  UPDATE_RELIGION_DETAILS,
  UPDATE_SUB_RELIGION_DETAILS,
} from "./registrationActionTypes.js";
const initialState = {
  registerationInfo: {
    date_of_birth: "1993/01/01",
  },
  loginInfo: {},
  loginInfoErros: {},
  registerationInfoErros: {},
  currentPage: 1,
  religions: [],
  subReligions: [],
  castes: [],
  other: null,
  userDetails: {},
  afterLoginErrors: {}
};

export const registrationReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_LOGIN_DATA:

      return {
        ...state,
        userDetails: action.payload,
      };
    case AFTER_LOGIN_ERROR:
      return {
        ...state,
        afterLoginErrors: action.payload,
      };
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

      case UPDATE_LOGIN_LOCAL_DATA:
      return {
        ...state,
        loginInfo: { ...state.loginInfo, ...action.payload },
      };
    case UPDATE_REGISRATION_ERROR:
      return {
        ...state,
        registerationInfoErros: {
          ...state.registerationInfoErros,
          ...action.payload,
        },
      };

      case UPDATE_LOGIN_ERROR:
        return {
          ...state,
          loginInfoErros: {
            ...state.loginInfoErros,
            ...action.payload,
          },
        };

    default:
      return state;
  }
};
