import { all } from 'redux-saga/effects';
import commonWatcher from './common/commonSaga';
import registrationWatcher from './registration/registrationSaga';
import profileWatcher from './profile/profileSaga';

// Root Saga
export default function* rootSaga() {
  yield all([
    commonWatcher(),
    registrationWatcher(),
    profileWatcher()
  ]);
}