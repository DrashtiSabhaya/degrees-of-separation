import { AnyAction } from "redux";
import { takeLatest, put, call } from "redux-saga/effects";
import { LOAD_USERS, ADD_FRIEND, SAVE_USER } from "./actionTypes";
import {
  getUsersSuccess,
  saveUserSuceess,
  friendshipAddingSuceess,
  userLoadingFailed,
  saveUserFailed,
  friendshipAddFailed,
} from "./actions";
import { addUser, addUserFriendship, fetchAllUsers } from "../../api/users";
import { Friendship, User } from "../../constants/types";

export interface ResponseGenerator {
  [x: string]: any;
  config?: any;
  data?: any;
  headers?: any;
  request?: any;
  status?: number;
  statusText?: string;
}

function* onLoadUsers() {
  try {
    const response: ResponseGenerator = yield call(() => fetchAllUsers());
    let userData: User[] = [];
    response.forEach((user: any) =>
      userData.push({
        id: user.id,
        username: user.data.username,
        friends: user.data?.friends || [],
      })
    );
    yield put(getUsersSuccess(userData));
  } catch (error: any) {
    yield put(userLoadingFailed(error));
  }
}

function* onSaveUser(action: AnyAction) {
  const data: string = action.payload;
  try {
    const response: ResponseGenerator = yield call(addUser, data);
    yield put(saveUserSuceess(response.data));
  } catch (error: any) {
    yield put(saveUserFailed(error));
  }
}

function* onAddFriend(action: AnyAction) {
  const data: Friendship = action.payload;
  try {
    const response: ResponseGenerator = yield call(addUserFriendship, data);
    console.log(response);
    yield put(friendshipAddingSuceess(response.data));
  } catch (error: any) {
    yield put(friendshipAddFailed(error));
  }
}

function* UserSaga() {
  yield takeLatest(LOAD_USERS, onLoadUsers);
  yield takeLatest(SAVE_USER, onSaveUser);
  yield takeLatest(ADD_FRIEND, onAddFriend);
}

export default UserSaga;
