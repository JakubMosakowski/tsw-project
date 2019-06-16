import { RootState } from "@/data/store/store";
import { GetterTree } from "vuex";
import { ContestState } from "@/data/store/modules/contest/contestState";

export const getters: GetterTree<ContestState, RootState> = {
  horses: state => state.horses,
  horseById: state => (id: string) => state.horses.find(item => item.id == id),
  judges: state => state.judges,
  ranks: state => state.ranks,
  errors: state => state.errors
};
