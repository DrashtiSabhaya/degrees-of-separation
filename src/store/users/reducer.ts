import { AnyAction } from "redux";
import {
  LOAD_USERS,
  USERS_LOADED,
  USER_LOADING_FAILED,
  SAVE_USER,
  USER_SAVED,
  USER_SAVING_FAILED,
  ADD_FRIEND,
  ADDED_AS_FRIEND,
  ADD_FRIENDSHIP_FAILED,
} from "./actionTypes";
import { User } from "../../constants/types";

interface UserState {
  users: User[];
  user: User;
  status: string;
  error: {
    message: string;
  };
  sucessMessage: string;
}

const initialState: UserState = {
  users: [],
  user: { id: "", username: "", friends: [] },
  status: "initial",
  error: {
    message: "",
  },
  sucessMessage: "",
};

const UserReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case LOAD_USERS:
      state = { ...state, status: "loading" };
      break;
    case USERS_LOADED:
      state = { ...state, users: action.payload, status: "loaded" };
      break;
    case USER_LOADING_FAILED:
      state = {
        ...state,
        error: {
          message: "Error",
        },
        status: "failed",
      };
      break;
    case SAVE_USER:
      state = { ...state, status: "saving" };
      break;
    case USER_SAVED:
      state = { ...state, sucessMessage: action.payload.message, status: "saved" };
      break;
    case USER_SAVING_FAILED:
      state = {
        ...state,
        error: {
          message: "Error::" + action.payload.message,
        },
        status: "failed",
      };
      break;
    case ADD_FRIEND:
      state = { ...state, status: "adding" };
      break;
    case ADDED_AS_FRIEND:
      state = { ...state, sucessMessage: action.payload.message, status: "added" };
      break;
    case ADD_FRIENDSHIP_FAILED:
      state = {
        ...state,
        error: {
          message: "Error" + action.payload.message,
        },
        status: "failed",
      };
      break;
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default UserReducer;
