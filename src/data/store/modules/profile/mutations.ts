import { MutationTree } from "vuex";
import { ProfileState } from "@/data/store/modules/profile/profileState";
import { UserData } from "@/domain/model/UserData";
import {
  getUserToken,
  removeUserToken,
  setUserData
} from "@/data/storage/storageManager";
import axios from "axios";

export const mutations: MutationTree<ProfileState> = {
  authSuccess(state: ProfileState, user: UserData) {
    setUserData(user);
    axios.defaults.headers.common["Authorization"] = `Bearer ${getUserToken()}`;
    state.user = user;
  },
  logout(state) {
    state.user = undefined;
    axios.defaults.headers.common["Authorization"] = `none`;
    removeUserToken();
  }
};
