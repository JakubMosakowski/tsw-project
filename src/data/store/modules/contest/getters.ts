import { GetterTree } from "vuex";
import { ContestState } from "@/data/store/modules/contest/contestState";
import { RootState } from "@/data/store/modules/root/rootState";

export const getters: GetterTree<ContestState, RootState> = {
  horses: state => state.horses,
  horseById: state => (id: string) => state.horses.find(item => item.id == id),
  horsesByRank: state => (id: string) =>
    state.horses.filter(item => item.rank.id == id),

  judges: state => state.judges,

  ranks: state => state.ranks,
  rankById: state => (id: string) => state.ranks.find(item => item.id == id)
};
