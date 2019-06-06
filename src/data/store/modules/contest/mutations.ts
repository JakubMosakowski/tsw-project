import { MutationTree } from "vuex";
import { ContestState } from "@/data/store/modules/contest/contestState";
import { Status } from "@/domain/model/Status";
import { RacingHorse } from "@/domain/model/Horse";
import { Judge } from "@/domain/model/Judge";
import { Rank } from "@/domain/model/Rank";

export const mutations: MutationTree<ContestState> = {
  loading(state) {
    state.status = Status.LOADING;
  },
  error(state) {
    state.status = Status.ERROR;
  },

  horsesFetchedFromSocket(state, horses: RacingHorse[]) {
    state.horses = horses;
  },
  horsesReordered(state, horses: RacingHorse[]) {
    state.horses = horses;
  },
  horsesFetched(state, horses: RacingHorse[]) {
    state.horses = horses;
  },
  horseDeleted(state, horse: RacingHorse) {
    state.horses = state.horses.filter(item => item != horse);
  },

  judgesFetchedFromSocket(state, judges: Judge[]) {
    state.judges = judges;
  },

  ranksFetchedFromSocket(state, ranks: Rank[]) {
    state.ranks = ranks;
  }
};
