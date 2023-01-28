import { User } from "../constants/types";

export const findDegree = (user1: User, user2: User, userList: User[]) => {
  const degrees: User[][] = [];

  function findPath(user1: User, user2: User, userList: User[]): void {
    let visited: string[] = [];
    let path: User[] = [];
    path.push(user1);
    searchDFS(user1, user2, userList, visited, path);
  }

  function searchDFS(
    user1: User,
    user2: User,
    userList: User[],
    visited: string[],
    path: User[]
  ): void {
    visited.push(user1.id);
    if (user1.id === user2.id) {
      degrees.push([...path]);
    } else {
      if (user1.friends?.length) {
        for (let i = 0; i < user1.friends.length; i++) {
          const y: User | undefined = userList.find((user) => user.id === user1.friends?.[i]);
          if (y && !visited.includes(y.id)) {
            visited.push(y.id);
            path.push(y);
            searchDFS(y, user2, userList, visited, path);
            path.pop();
          }
        }
      }
    }
  }

  findPath(user1, user2, userList);

  return degrees;
};
