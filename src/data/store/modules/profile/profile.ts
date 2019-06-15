import { Module } from "vuex";
import { getters } from "./getters";
import { actions } from "./actions";
import { mutations } from "./mutations";
import { ProfileState } from "./profileState";
import { RootState } from "../../store";
import { getUserToken } from "@/data/storage/storageManager";

export const state: ProfileState = {
  status: undefined,
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
