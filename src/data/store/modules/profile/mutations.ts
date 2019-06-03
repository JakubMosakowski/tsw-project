import { MutationTree } from "vuex";
import { ProfileState } from "@/data/store/modules/profile/profileState";
import { Status } from "@/domain/model/Status";
import { User } from "@/domain/model/User";

export interface UserPayload {
  user: User;
  token: string;
}
export const mutations: MutationTree<ProfileState> = {
  authRequest(state) {
    state.status = Status.LOADING;
  },
  authSuccess(state: ProfileState, payload: UserPayload) {
    state.status = Status.SUCCESS;
    state.user = payload.user;
    state.token = payload.token;
  },
  authError(state) {
    state.status = Status.ERROR;
  },
  logout(state) {
    state.status = undefined;
    state.token = "";
  }
};
