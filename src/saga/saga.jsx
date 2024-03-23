import { all } from 'redux-saga/effects';
import commonWatcher from './common/commonSaga';
import registrationWatcher from './registration/registrationSaga';

// Root Saga
export default function* rootSaga() {
  yield all([
    commonWatcher(),
    registrationWatcher()
  ]);
}