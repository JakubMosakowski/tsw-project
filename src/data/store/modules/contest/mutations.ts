import { MutationTree } from "vuex";
import { ContestState } from "@/data/store/modules/contest/contestState";
import { RacingHorse } from "@/domain/model/Horse";
import { Judge } from "@/domain/model/Judge";
import { Rank } from "@/domain/model/Rank";

export const mutations: MutationTree<ContestState> = {
  fetchedAll(state, values) {
    state.judges = values[0].data;
    state.horses = values[1].data;
    state.ranks = values[2].data;
  },

  horsesFetched(state, horses: RacingHorse[]) {
    state.horses = horses;
  },
  horseCreated(state, horse: RacingHorse) {
    state.horses.push(horse);
  },
  horseDeleted(state, horse: RacingHorse) {
    state.horses = state.horses.filter(item => item != horse);
  },
  horseUpdated(state, horse: RacingHorse) {
    const index = state.horses.findIndex(item => item.id == horse.id);

    state.horses[index] = horse;
  },

  judgesFetched(state, judges: Judge[]) {
    state.judges = judges;
  },
  judgeCreated(state, judge: Judge) {
    state.judges.push(judge);
  },
  judgeDeleted(state, judge: Judge) {
    state.judges = state.judges.filter(item => item != judge);
  },
  judgeUpdated(state, judge: Judge) {
    const index = state.judges.findIndex(item => item.id == judge.id);

    state.judges[index] = judge;
  },

  ranksFetched(state, ranks: Rank[]) {
    state.ranks = ranks;
  }
};
