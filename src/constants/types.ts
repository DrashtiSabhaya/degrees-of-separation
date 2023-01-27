export interface User {
  id: string;
  username: string;
  friends: string[];
}

export interface Users {
  users: User[];
}

export interface Friendship {
  user_id_one: string;
  user_id_two: string;
}

export interface ErrorData {
  message: string;
}
