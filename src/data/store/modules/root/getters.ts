import { GetterTree } from "vuex";
import { Status } from "@/domain/model/Status";
import { RootState } from "@/data/store/modules/root/rootState";
import { UNAUTHORIZED_CODE } from "@/data/api/API";

export const getters: GetterTree<RootState, RootState> = {
  status: state => state.status,
  errors: state => state.errors,
  isLoading: state => state.status == Status.LOADING,
  isUnauthorized: state => state.statusCode == UNAUTHORIZED_CODE,
  isError: state => state.status === Status.ERROR
};
