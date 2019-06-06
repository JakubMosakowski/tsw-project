import { RootState } from "@/data/store/store";
import { GetterTree } from "vuex";
import { ContestState } from "@/data/store/modules/contest/contestState";

export const getters: GetterTree<ContestState, RootState> = {
  horses: state => state.horses,
  judges: state => state.judges,
  ranks: state => state.ranks
};
