import { orderUsersByScore } from "./user";

export function getLocalStorageUsers() {
  const localStorageData = localStorage.getItem("learnimon__users");
  const users = localStorageData ? JSON.parse(localStorageData) : [];
  const sortedUsers = orderUsersByScore(users);
  return sortedUsers;
}

// exports a user from local storage and adds a few properties
export function getUserFromLocalStorage(id: string): Record<string, any> {
  const users = getLocalStorageUsers();
  const user = users.find((user: any) => user.name === id) || {};
  return user;
}
