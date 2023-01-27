import { ErrorData, Friendship, User, Users } from "../../constants/types";
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

export const getUsers = () => {
  return {
    type: LOAD_USERS,
  };
};

export const getUsersSuccess = (users: Users) => {
  return {
    type: USERS_LOADED,
    payload: users,
  };
};

export const userLoadingFailed = (error: ErrorData) => {
  return {
    type: USER_LOADING_FAILED,
    payload: error,
  };
};

export const saveUser = (user: User) => {
  return {
    type: SAVE_USER,
    payload: user,
  };
};

export const saveUserSuceess = (sucessMessage: string) => {
  return {
    type: USER_SAVED,
    payload: sucessMessage,
  };
};

export const saveUserFailed = (error: ErrorData) => {
  return {
    type: USER_SAVING_FAILED,
    payload: error,
  };
};

export const addFriendship = (data: Friendship) => {
  return {
    type: ADD_FRIEND,
    payload: data,
  };
};

export const friendshipAddingSuceess = (successMessage: string) => {
  return {
    type: ADDED_AS_FRIEND,
    payload: successMessage,
  };
};

export const friendshipAddFailed = (error: ErrorData) => {
  return {
    type: ADD_FRIENDSHIP_FAILED,
    payload: error,
  };
};
