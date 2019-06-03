import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";
import { profile } from "@/data/store/modules/profile/profile";
import { contest } from "@/data/store/modules/contest/contest";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export interface RootState {}

const store: StoreOptions<RootState> = {
  modules: {
    profile,
    contest
  },
  plugins: [createPersistedState()]
};

export default new Vuex.Store<RootState>(store);
