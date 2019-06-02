import { MutationTree } from "vuex";
import { ProfileState } from "@/store/modules/profile/profileState";
import { Status } from "@/model/Status";
import { User } from "@/model/User";

export interface UserPayload {
  user: User;
  token: string;
}
export const mutations: MutationTree<ProfileState> = {
  auth_request(state) {
    state.status = Status.LOADING;
  },
  auth_success(state: ProfileState, payload: UserPayload) {
    state.status = Status.SUCCESS;
    state.user = payload.user;
    state.token = payload.token;
  },
  auth_error(state) {
    state.status = Status.ERROR;
  },
  logout(state) {
    state.status = undefined;
    state.token = "";
  }
};
