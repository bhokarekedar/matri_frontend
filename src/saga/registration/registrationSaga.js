import { put, takeLatest, select } from "redux-saga/effects";
import { ERROR_OCCURED, UPDATE_IS_LOADING } from "../config/configActionTypes";

import { API } from "../../utils/networkService";
import {
  CREATE_NEW_USER,
  GET_CASTE_DETAILS,
  GET_RELIGION_DETAILS,
  GET_SUB_RELIGION_DETAILS,
  SET_CURRENT_PAGE,
  UPDATE_CASTE_DETAILS,
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
} from "../../constants/apiConstants";
import {
  hasEmptyString,
  hasSpecialCharacters,
} from "../../utils/reusableFunctions";
import { password } from "../../constants/utilConstants";

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

  let { currentPage, mandatoryFileds, validateFields } = request.payload;

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
    const selectFieldErrors = (state) =>
      state.registration.registerationInfoErros;
    const errors = yield select(selectFieldErrors);

    let isEmptyerrors = hasEmptyString(errors);

    if (isEmptyerrors) {
      for (let i = 0; i < validateFields.length; i++) {
        const item = validateFields[i];

        if (item === password && data[item]?.length < 7) {
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

      let isEmptyerrorsValidate = hasEmptyString(errors);
      if (isEmptyerrorsValidate) {
        yield put({ type: SET_CURRENT_PAGE, payload: 2 });
      }
    }
  }

}
function* registrationWatcher() {
  yield takeLatest(GET_RELIGION_DETAILS, getReligionData);
  yield takeLatest(GET_SUB_RELIGION_DETAILS, getSubReligionData);
  yield takeLatest(GET_CASTE_DETAILS, getCastenData);
  yield takeLatest(CREATE_NEW_USER, createNewUser);
  yield takeLatest(VALIDATE_FIELDS, validateFieldsSaga);
  // yield takeLatest(GET_GENERAL_INFO, getGeneralData);
}

export default registrationWatcher;
