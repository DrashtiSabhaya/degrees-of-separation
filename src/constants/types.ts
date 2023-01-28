import store from "../store";

export interface User {
  id: string;
  username: string;
  friends?: string[];
}

export interface Friendship {
  user1: User;
  user2: User;
}

export interface ErrorData {
  message: string;
}

export type RootState = ReturnType<typeof store.getState>;
