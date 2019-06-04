import { RootState } from "@/data/store/store";
import { ProfileState } from "@/data/store/modules/profile/profileState";
import { ActionTree } from "vuex";
import { User } from "@/domain/model/User";
import { API } from "@/data/api/API";

export const actions: ActionTree<ProfileState, RootState> = {
  login({ commit }, user: User) {
    return new Promise(resolve => {
      commit("authRequest");
      API.login(user)
        .then(res => {
          const { token, user } = res.data;
          const userPayload = { user, token };

          localStorage.setItem("token", token);
          commit("authSuccess", userPayload);
          resolve(res);
        })
        .catch(err => {
          commit("authError", err);
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
