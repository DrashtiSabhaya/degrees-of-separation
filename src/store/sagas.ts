import { all, fork } from "redux-saga/effects";

import UserSaga from "./users/saga";

export default function* rootSaga() {
  yield all([fork(UserSaga)]);
}
