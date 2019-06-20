import Cookies from "js-cookie";
import { UserData } from "@/domain/model/UserData";

export const getUserData = (): UserData | undefined => {
  const userData = Cookies.get("token");
  if (userData) {
    return JSON.parse(userData);
  }
  return undefined;
};

export const getUserToken = (): string => {
  const userData = getUserData();
  if (userData) {
    return userData.token || "";
  }
  return "";
};

export const setUserData = (data: UserData) =>
  Cookies.set("token", JSON.stringify(data));

export const removeUserToken = () => Cookies.remove("token");
