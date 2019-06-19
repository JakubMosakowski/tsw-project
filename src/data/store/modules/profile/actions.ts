import { ProfileState } from "@/data/store/modules/profile/profileState";
import { ActionTree } from "vuex";
import { User } from "@/domain/model/User";
import { API } from "@/data/api/API";
import { removeUserToken, setUserToken } from "@/data/storage/storageManager";
import { RootState } from "@/data/store/modules/root/rootState";

export const actions: ActionTree<ProfileState, RootState> = {
  login({ dispatch, commit }, user: User) {
    return new Promise(resolve => {
      commit("setLoading", null, { root: true });
      API.login(user)
        .then(res => {
          const { token, user } = res.data;
          const userPayload = { user, token };

          setUserToken(token);
          commit("authSuccess", userPayload);
          commit("setSuccess", null, { root: true });
          resolve(res);
        })
        .catch(err => {
          dispatch("setError", err, { root: true });
          removeUserToken();
        });
    });
  },
  logout({ commit }) {
    return new Promise(resolve => {
      commit("logout");
      commit("resetStatus", null, { root: true });
      removeUserToken();
      resolve();
    });
  }
};
