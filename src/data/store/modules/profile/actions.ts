import { ProfileState } from "@/data/store/modules/profile/profileState";
import { ActionTree } from "vuex";
import { UserData } from "@/domain/model/UserData";
import { API } from "@/data/api/API";
import { removeUserToken, setUserData } from "@/data/storage/storageManager";
import { RootState } from "@/data/store/modules/root/rootState";

export const actions: ActionTree<ProfileState, RootState> = {
  login({ dispatch, commit }, user: UserData) {
    return new Promise(resolve => {
      commit("setLoading", null, { root: true });
      API.login(user)
        .then(res => {
          const { token } = res.data;
          const userData = new UserData(user.login, token);
          setUserData(userData);

          commit("authSuccess", userData);
          commit("setSuccess", null, { root: true });
          resolve(res);
        })
        .catch(e => {
          dispatch("setError", e, { root: true });
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
