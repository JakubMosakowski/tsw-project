import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";
import { profile } from "@/store/modules/profile/profile";

Vue.use(Vuex);

export interface RootState {}

const store: StoreOptions<RootState> = {
  modules: {
    profile
  }
};

export default new Vuex.Store<RootState>(store);
