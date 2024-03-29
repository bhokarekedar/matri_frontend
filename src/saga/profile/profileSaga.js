import { put, takeLatest, select } from "redux-saga/effects";
import { ERROR_OCCURED, UPDATE_IS_LOADING } from "../config/configActionTypes";
import {GET_PROFILE_DATA} from './profileActionTypes'
import { API } from "../../utils/networkService";
import { GET_PROFILE_DATA_API } from "../../constants/apiConstants";

function* getProfileData(request) {
  try {
    yield put({ type: UPDATE_IS_LOADING, payload: true });

    const response = yield API.post(GET_PROFILE_DATA_API);
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


function* profileWatcher() {
  yield takeLatest(GET_PROFILE_DATA, getProfileData);
 
}

export default profileWatcher;
