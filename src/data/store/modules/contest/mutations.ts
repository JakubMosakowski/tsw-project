import { MutationTree } from "vuex";
import { ContestState } from "@/data/store/modules/contest/contestState";
import { Status } from "@/domain/model/Status";
import { RacingHorse } from "@/domain/model/Horse";
import { Judge } from "@/domain/model/Judge";
import { Rank } from "@/domain/model/Rank";

export const mutations: MutationTree<ContestState> = {
  loading(state) {
    state.status = Status.LOADING;
    state.errors = [];
  },
  setError(state, errors: [Error]) {
    state.status = Status.ERROR;
    state.errors = errors;
  },
  fetchedAll(state, values) {
    state.judges = values[0].data;
    state.horses = values[1].data;
    state.ranks = values[2].data;
    state.status = Status.SUCCESS;
  },

  horsesFetched(state, horses: RacingHorse[]) {
    state.horses = horses;
    state.status = Status.SUCCESS;
  },
  loadingHorses(state) {
    state.horses = [];
    state.status = Status.LOADING;
    state.errors = [];
  },
  horseDeleted(state, horse: RacingHorse) {
    state.horses = state.horses.filter(item => item != horse);
    state.status = Status.SUCCESS;
  },
  horseUpdated(state, horse: RacingHorse) {
    const index = state.horses.findIndex(item => item.id == horse.id);

    state.horses[index] = horse;
    state.status = Status.SUCCESS;
  },

  judgesFetched(state, judges: Judge[]) {
    state.judges = judges;
    state.status = Status.SUCCESS;
  },
  loadingJudges(state) {
    state.judges = [];
    state.status = Status.LOADING;
    state.errors = [];
  },

  ranksFetched(state, ranks: Rank[]) {
    state.ranks = ranks;
    state.status = Status.SUCCESS;
  },
  loadingRanks(state) {
    state.ranks = [];
    state.status = Status.LOADING;
    state.errors = [];
  }
};
