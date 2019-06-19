import { MutationTree } from "vuex";
import { ProfileState } from "@/data/store/modules/profile/profileState";
import { User } from "@/domain/model/User";

export interface UserPayload {
  user: User;
  token: string;
}
export const mutations: MutationTree<ProfileState> = {
  authSuccess(state: ProfileState, payload: UserPayload) {
    state.user = payload.user;
    state.token = payload.token;
  },
  logout(state) {
    state.token = "";
  }
};
