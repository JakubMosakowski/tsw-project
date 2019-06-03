import { MutationTree } from "vuex";
import { ContestState } from "@/data/store/modules/contest/contestState";
import { Status } from "@/domain/model/Status";
import { RacingHorse } from "@/domain/model/Horse";

export const mutations: MutationTree<ContestState> = {
  horsesLoading(state) {
    state.status = Status.LOADING;
  },
  horsesError(state) {
    state.status = Status.ERROR;
  },
  horsesFetched(state, horses: RacingHorse[]) {
    state.horses = horses;
  },
  horseDeleted(state, horse: RacingHorse) {
    state.horses = state.horses.filter(item => item != horse);
  }
};
