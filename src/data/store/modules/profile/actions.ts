import { RootState } from "@/data/store/store";
import { ProfileState } from "@/data/store/modules/profile/profileState";
import { ActionTree } from "vuex";
import { User } from "@/domain/model/User";
import { API } from "@/data/api/API";

export const actions: ActionTree<ProfileState, RootState> = {
  login({ commit }, user: User) {
    return new Promise(resolve => {
      commit("auth_request");
      API.login(user)
        .then(resp => {
          const token = resp.data.token;
          const user = resp.data.user;
          const userPayload = { user: user, token: token };

          localStorage.setItem("token", token);
          commit("auth_success", userPayload);
          resolve(resp);
        })
        .catch(err => {
          commit("auth_error", err);
          localStorage.removeItem("token");
        });
    });
  },
  logout({ commit }) {
    return new Promise(resolve => {
      commit("logout");
      localStorage.removeItem("token");
      resolve();
    });
  }
};
