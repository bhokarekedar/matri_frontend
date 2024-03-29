import { put, takeLatest, select } from "redux-saga/effects";
import { ERROR_OCCURED, UPDATE_IS_LOADING } from "../config/configActionTypes";

import { API } from "../../utils/networkService";
import {
  AFTER_LOGIN_ERROR,
  CREATE_NEW_USER,
  GET_CASTE_DETAILS,
  GET_RELIGION_DETAILS,
  GET_SUB_RELIGION_DETAILS,
  LOGIN_USER,
  SET_CURRENT_PAGE,
  UPDATE_CASTE_DETAILS,
  UPDATE_LOGIN_DATA,
  UPDATE_REGISRATION_ERROR,
  UPDATE_RELIGION_DETAILS,
  UPDATE_SUB_RELIGION_DETAILS,
  VALIDATE_FIELDS,
} from "./registrationActionTypes";
import {
  CREATE_NEW_USER_API,
  GET_CASTE_API,
  GET_RELEGION_API,
  GET_SUB_RELEGION_API,
  LOGIN_USER_API,
} from "../../constants/apiConstants";
import {
  decodeToken,
  hasEmptyString,
  hasSpecialCharacters,
  validateEmail,
  validateMobileNumber,
} from "../../utils/reusableFunctions";
import { cpassword, email, home_phone, mobile_number, password } from "../../constants/utilConstants";

function* getReligionData(request) {
  try {
    yield put({ type: UPDATE_IS_LOADING, payload: true });
    const response = yield API.get(GET_RELEGION_API);
    if (response.status === 200) {
      yield put({ type: UPDATE_RELIGION_DETAILS, payload: response.data });
    }
  } catch (error) {
    console.log("error", error);
    yield put({
      type: ERROR_OCCURED,
      response: { error: "something went wrong" },
    });
  } finally {
    yield put({ type: UPDATE_IS_LOADING, payload: false });
  }
}
function* getSubReligionData(request) {
  try {
    yield put({ type: UPDATE_IS_LOADING, payload: true });
    let data = {
      relegion_id: request.payload,
    };

    const response = yield API.post(GET_SUB_RELEGION_API, data);

    if (response.status === 200) {
      yield put({ type: UPDATE_SUB_RELIGION_DETAILS, payload: response.data });
    }
  } catch (error) {
    console.log("error", error);
    yield put({
      type: ERROR_OCCURED,
      response: { error: "something went wrong" },
    });
  } finally {
    yield put({ type: UPDATE_IS_LOADING, payload: false });
  }
}

function* getCastenData(request) {
  try {
    yield put({ type: UPDATE_IS_LOADING, payload: true });
    let data = {
      sub_religion_id: request.payload,
    };

    const response = yield API.post(GET_CASTE_API, data);
    if (response.status === 200) {
      yield put({ type: UPDATE_CASTE_DETAILS, payload: response.data });
    }
  } catch (error) {
    console.log("error", error);
    yield put({
      type: ERROR_OCCURED,
      response: { error: "something went wrong" },
    });
  } finally {
    yield put({ type: UPDATE_IS_LOADING, payload: false });
  }
}

function* createNewUser(request) {
  try {
    yield put({ type: UPDATE_IS_LOADING, payload: true });

    const response = yield API.post(CREATE_NEW_USER_API, request.payload);
    if (response.status === 200) {
      // yield put({ type:  UPDATE_CASTE_DETAILS, payload: response.data });
    }
  } catch (error) {
    console.log("error", error);
    yield put({
      type: ERROR_OCCURED,
      response: { error: "something went wrong" },
    });
  } finally {
    yield put({ type: UPDATE_IS_LOADING, payload: false });
  }
}

function* validateFieldsSaga(request) {
  const selectFieldValues = (state) => state.registration.registerationInfo;

  const data = yield select(selectFieldValues);

  let { currentPage, mandatoryFileds, validateFields, specialValidations } =
    request.payload;

  if (currentPage === 1) {
    for (let i = 0; i < mandatoryFileds.length; i++) {
      const item = mandatoryFileds[i];
      if (!data[item]) {
        let errors = {
          [item]: "Field cannot be empty.",
        };
        yield put({ type: UPDATE_REGISRATION_ERROR, payload: errors });
      }
    }
    for (let i = 0; i < validateFields.length; i++) {
      const item = validateFields[i];

      if (item === password && data[item]?.length < 6) {
        let errors = {
          [item]: "Please enter a value that is more than 6 letters long.",
        };
        yield put({ type: UPDATE_REGISRATION_ERROR, payload: errors });
      } else if (data[item]?.length < 3) {
        let errors = {
          [item]: "Please enter a value that is more than 3 letters long.",
        };
        yield put({ type: UPDATE_REGISRATION_ERROR, payload: errors });
      } else if (item !== password && hasSpecialCharacters(data[item])) {
        let errors = {
          [item]: "Please do not enter special characters.",
        };
        yield put({ type: UPDATE_REGISRATION_ERROR, payload: errors });
      }
    }
    for (let i = 0; i < specialValidations.length; i++) {
      const item = specialValidations[i];
      if (item === cpassword) {
        if (data[item] !== data["password"]) {
          let errors = {
            [item]: "The password and confirm password fields must match.",
          };
          yield put({ type: UPDATE_REGISRATION_ERROR, payload: errors });
        }
      }
      else if (item === email) {
        if (!validateEmail(data[item])) {
          let errors = {
            [item]: "Please enter a valid email address.",
          };
          yield put({ type: UPDATE_REGISRATION_ERROR, payload: errors });
        }
      }
    }
    const selectFieldErrors = (state) =>
      state.registration.registerationInfoErros;
    const errors = yield select(selectFieldErrors);
    let isEmptyerrorsValidate = hasEmptyString(errors);
    if (isEmptyerrorsValidate) {
      yield put({ type: SET_CURRENT_PAGE, payload: 2 });
    }
  }

  if (currentPage === 2) {
    for (let i = 0; i < mandatoryFileds.length; i++) {
      const item = mandatoryFileds[i];
      if (!data[item]) {
        let errors = {
          [item]: "Field cannot be empty.",
        };
        yield put({ type: UPDATE_REGISRATION_ERROR, payload: errors });
      }
    }
    for (let i = 0; i < validateFields.length; i++) {
      const item = validateFields[i];
      if (data[item]?.length < 3) {
        let errors = {
          [item]: "Please enter a value that is more than 3 letters long.",
        };
        yield put({ type: UPDATE_REGISRATION_ERROR, payload: errors });
      } else if (hasSpecialCharacters(data[item])) {
        let errors = {
          [item]: "Please do not enter special characters.",
        };
        yield put({ type: UPDATE_REGISRATION_ERROR, payload: errors });
      }
    }
    for (let i = 0; i < specialValidations.length; i++) {
      const item = specialValidations[i];
      if (item === mobile_number || item === home_phone) {
        if (!validateMobileNumber(data[item])) {
          let errors = {
            [item]: "Please enter a valid mobile number.",
          };
          yield put({ type: UPDATE_REGISRATION_ERROR, payload: errors });
        }
      }
    }
    const selectFieldErrors = (state) =>
      state.registration.registerationInfoErros;
    const errors = yield select(selectFieldErrors);
    let isEmptyerrorsValidate = hasEmptyString(errors);
    if (isEmptyerrorsValidate) {
      yield put({ type: SET_CURRENT_PAGE, payload: 3 });
    }
  }

  if (currentPage === 3) {
    for (let i = 0; i < mandatoryFileds.length; i++) {
      const item = mandatoryFileds[i];
      if (!data[item]) {
        let errors = {
          [item]: "Field cannot be empty.",
        };
        yield put({ type: UPDATE_REGISRATION_ERROR, payload: errors });
      }
    }
    for (let i = 0; i < validateFields.length; i++) {
      const item = validateFields[i];
      if (data[item]?.length < 3) {
        let errors = {
          [item]: "Please enter a value that is more than 3 letters long.",
        };
        yield put({ type: UPDATE_REGISRATION_ERROR, payload: errors });
      } 
      else if (hasSpecialCharacters(data[item])) {
        let errors = {
          [item]: "Please do not enter special characters.",
        };
        yield put({ type: UPDATE_REGISRATION_ERROR, payload: errors });
      }
    }
   
    const selectFieldErrors = (state) =>
      state.registration.registerationInfoErros;
    const errors = yield select(selectFieldErrors);
    let isEmptyerrorsValidate = hasEmptyString(errors);
    if (isEmptyerrorsValidate) {
      yield put({ type: SET_CURRENT_PAGE, payload: 4 });
    }
  }

  if (currentPage === 4) {
    for (let i = 0; i < mandatoryFileds.length; i++) {
      const item = mandatoryFileds[i];
      if (!data[item]) {
        let errors = {
          [item]: "Field cannot be empty.",
        };
        yield put({ type: UPDATE_REGISRATION_ERROR, payload: errors });
      }
    }
    for (let i = 0; i < validateFields.length; i++) {
      const item = validateFields[i];
      if (data[item]?.length < 3) {
        let errors = {
          [item]: "Please enter a value that is more than 3 letters long.",
        };
        yield put({ type: UPDATE_REGISRATION_ERROR, payload: errors });
      } else if (hasSpecialCharacters(data[item])) {
        let errors = {
          [item]: "Please do not enter special characters.",
        };
        yield put({ type: UPDATE_REGISRATION_ERROR, payload: errors });
      }
    }
    const selectFieldErrors = (state) =>
      state.registration.registerationInfoErros;
    const errors = yield select(selectFieldErrors);
    let isEmptyerrorsValidate = hasEmptyString(errors);
    if (isEmptyerrorsValidate) {
      let newdata = {
        username: "fyfyf4555" || null,
        profile_for: data?.profile_for || null,
        email: data?.email || null,
        password: data?.password || null,
        cpassword: data?.cpassword || null,
        first_name: data?.first_name || null,
        middle_name: data?.middle_name || null,
        last_name: data?.last_name || null,
        gender: data?.gender || null,
        marital_status: data?.marital_status || null,
        mother_tongue: data?.mother_tongue || null,
        date_of_birth: data?.date_of_birth || null,
        religion: data?.religion || null,
        sub_religion: data?.sub_religion || null,
        caste: data?.caste || null,
        other_caste: data?.other_caste || null,
        contact_email: data?.email || null,
        mobile_number: data?.mobile_number || null,
        home_phone: data?.home_phone || null,
        current_location: data?.current_location || null,
        parent_location: data?.parent_location || null,
        education: data?.education || null,
        education_details: data?.education_details || null,
        school_college_university:
          data?.school_college_university || null,
        profession: data?.profession || null,
        profession_details: data?.profession_details || null,
        annual_income: data?.annual_income || null,
        present_status: data?.present_status || null,
        you_work_with: data?.you_work_with || null,
        designation: data?.designation || null,
      };
    
      yield put({ type: CREATE_NEW_USER, payload: newdata });
    }
  }
}

function* loginUser(request) {
  try {
    yield put({ type: UPDATE_IS_LOADING, payload: true });
    const response = yield API.post(LOGIN_USER_API, request.payload,);
    if (response.status === 200) {
     
      let decodedValues = decodeToken(response.data);
      yield put({ type: UPDATE_LOGIN_DATA, payload: decodedValues });
      localStorage.setItem('token', response.data.token);
      
    }
  } catch (error) {
    yield put({ type: AFTER_LOGIN_ERROR, payload: error.response?.data });
    yield put({
      type: ERROR_OCCURED,
      response: { error: "something went wrong" },
    });
  } finally {
    yield put({ type: UPDATE_IS_LOADING, payload: false });
  }
}

function* registrationWatcher() {
  yield takeLatest(GET_RELIGION_DETAILS, getReligionData);
  yield takeLatest(GET_SUB_RELIGION_DETAILS, getSubReligionData);
  yield takeLatest(GET_CASTE_DETAILS, getCastenData);
  yield takeLatest(CREATE_NEW_USER, createNewUser);
  yield takeLatest(LOGIN_USER, loginUser);
  yield takeLatest(VALIDATE_FIELDS, validateFieldsSaga);
  // yield takeLatest(GET_GENERAL_INFO, getGeneralData);
}

export default registrationWatcher;
