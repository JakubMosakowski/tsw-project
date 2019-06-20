import { MutationTree } from "vuex";
import { ProfileState } from "@/data/store/modules/profile/profileState";
import { UserData } from "@/domain/model/UserData";

export const mutations: MutationTree<ProfileState> = {
  authSuccess(state: ProfileState, user: UserData) {
    state.user = user;
  },
  logout(state) {
    state.user = undefined;
  }
};
