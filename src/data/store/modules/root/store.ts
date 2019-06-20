import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";
import { profile } from "@/data/store/modules/profile/profile";
import { contest } from "@/data/store/modules/contest/contest";
import createPersistedState from "vuex-persistedstate";
import { RootState } from "@/data/store/modules/root/rootState";
import { mutations } from "@/data/store/modules/root/mutations";
import { getters } from "@/data/store/modules/root/getters";
import { actions } from "@/data/store/modules/root/actions";

Vue.use(Vuex);

export const state: RootState = {
  status: undefined,
  statusCode: undefined,
  errors: []
};

const store: StoreOptions<RootState> = {
  state,
  getters,
  actions,
  mutations,
  modules: {
    profile,
    contest
  },
  plugins: [
    createPersistedState({
      paths: ["contest"]
    })
  ]
};

export default new Vuex.Store<RootState>(store);
