import { put, takeLatest } from "redux-saga/effects";
import { ERROR_OCCURED, UPDATE_IS_LOADING } from "../config/configActionTypes";
import {
  GET_GENERAL_INFO,
  GET_USER_DATA,
  UPDATE_GENERAL_INFO,
} from "./commonActionTypes";
import { API } from "../../utils/networkService";
import { GET_GENERAL_INFO_API } from "../../constants/apiConstants";

function* getUserData(request) {
  try {
    let params = request.payload;
    yield put({ type: UPDATE_IS_LOADING, payload: true });
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

function* getGeneralData(request) {
  try {
    yield put({ type: UPDATE_IS_LOADING, payload: true });
    const response = yield API.get(GET_GENERAL_INFO_API);
    if (response.status === 200) {
      yield put({ type: UPDATE_GENERAL_INFO, payload: response.data });
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

function* commonWatcher() {
  yield takeLatest(GET_USER_DATA, getUserData);
  yield takeLatest(GET_GENERAL_INFO, getGeneralData);
}

export default commonWatcher;
