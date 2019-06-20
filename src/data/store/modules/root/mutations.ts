import { MutationTree } from "vuex";
import { Status } from "@/domain/model/Status";
import { UNAUTHORIZED_CODE } from "@/data/api/API";
import { RootState } from "@/data/store/modules/root/rootState";

export const mutations: MutationTree<RootState> = {
  setLoading(state) {
    state.status = Status.LOADING;
    state.errors = [];
  },
  setApiError(state, errors) {
    state.status = Status.ERROR;
    state.errors = errors;
  },
  setUnauthorizedError(state) {
    state.status = Status.ERROR;
    state.statusCode = UNAUTHORIZED_CODE;
  },
  setSuccess(state) {
    state.status = Status.SUCCESS;
    state.statusCode = undefined;
    state.errors = [];
  },
  resetStatus(state) {
    state.status = undefined;
  }
};
