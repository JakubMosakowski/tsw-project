import { MutationTree } from "vuex";
import { ProfileState } from "@/data/store/modules/profile/profileState";
import { UserData } from "@/domain/model/UserData";
import { removeUserToken, setUserData } from "@/data/storage/storageManager";

export const mutations: MutationTree<ProfileState> = {
  authSuccess(state: ProfileState, user: UserData) {
    setUserData(user);
    state.user = user;
  },
  logout(state) {
    state.user = undefined;
    removeUserToken();
  }
};
