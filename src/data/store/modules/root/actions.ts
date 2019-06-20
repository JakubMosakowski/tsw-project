import { ActionTree } from "vuex";
import { UNAUTHORIZED_CODE } from "@/data/api/API";
import { RootState } from "@/data/store/modules/root/rootState";

export const actions: ActionTree<RootState, RootState> = {
  setError: ({ commit }, { response }) => {
    try {
      if (response.data.status == UNAUTHORIZED_CODE) {
        commit("setUnauthorizedError");
        return;
      }
      const { errors } = response.data;
      commit("setApiError", errors);
    } catch (e) {
      commit("setApiError", [{ msg: "Coś poszło nie tak" }]);
    }
  }
};
