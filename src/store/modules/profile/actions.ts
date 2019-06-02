import { RootState } from "@/store/store";
import { ProfileState } from "@/store/modules/profile/profileState";
import { ActionTree } from "vuex";
import axios from "axios";
import { User } from "@/model/User";

export const actions: ActionTree<ProfileState, RootState> = {
  login({ commit }, user: User) {
    return new Promise((resolve, reject) => {
      //TODO update requests
      commit("auth_request");
      axios({
        url: "http://localhost:3002/login",
        data: user,
        method: "POST"
      })
        .then(resp => {
          const token = resp.data.token;
          const user = resp.data.user;
          localStorage.setItem("token", token);
          axios.defaults.headers.common["Authorization"] = token;
          commit("auth_success", token, user);
          resolve(resp);
        })
        .catch(err => {
          commit("auth_error");
          localStorage.removeItem("token");
          reject(err);
        });
    });
  },
  logout({ commit }) {
    return new Promise(resolve => {
      commit("logout");
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
      resolve();
    });
  }
};
