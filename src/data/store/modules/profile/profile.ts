import { Module } from "vuex";
import { getters } from "./getters";
import { actions } from "./actions";
import { mutations } from "./mutations";
import { ProfileState } from "./profileState";
import { getUserToken } from "@/data/storage/storageManager";
import { RootState } from "@/data/store/modules/root/rootState";

export const state: ProfileState = {
  user: undefined,
  token: getUserToken() || ""
};

const namespaced: boolean = false;

export const profile: Module<ProfileState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations
};
