import Cookies from "js-cookie";

export const getUserToken = (): string => Cookies.get("token") || "";
export const setUserToken = (token: string) => Cookies.set("token", token);
export const removeUserToken = () => Cookies.remove("token");
