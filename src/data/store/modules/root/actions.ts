import { ActionTree } from "vuex";
import { UNAUTHORIZED_CODE } from "@/data/api/API";
import { RootState } from "@/data/store/modules/root/rootState";
import { APIError } from "@/domain/model/APIError";

export const actions: ActionTree<RootState, RootState> = {
  setError: ({ commit }, { response }) => {
    if (response.status == UNAUTHORIZED_CODE) {
      commit("setUnauthorizedError");
      return;
    }

    const errors = response.data.errors
      .map((item: APIError) => {
        if (item.msg.toLowerCase() == "invalid value") {
          return "";
        } else {
          return item.msg;
        }
      })
      .filter((item: string) => item != "");
    commit("setApiError", errors);
  }
};
