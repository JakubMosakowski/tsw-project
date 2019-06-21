import { GetterTree } from "vuex";
import { ContestState } from "@/data/store/modules/contest/contestState";
import { RootState } from "@/data/store/modules/root/rootState";

export const getters: GetterTree<ContestState, RootState> = {
  horses: state => state.horses.sort((a, b) => a.number - b.number),
  judges: state => state.judges,
  ranks: state => state.ranks.sort((a, b) => a.number - b.number)
};
