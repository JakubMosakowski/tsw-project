import { Module } from "vuex";
import { getters } from "./getters";
import { actions } from "./actions";
import { mutations } from "./mutations";
import { ContestState } from "./contestState";
import { RootState } from "../../store";

export const state: ContestState = {
  status: undefined,
  contests: [],
  horses: [],
  judges: [],
  ranks: []
};
const namespaced: boolean = false;

export const contest: Module<ContestState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations
};
