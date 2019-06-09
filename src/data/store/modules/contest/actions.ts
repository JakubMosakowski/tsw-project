import { RootState } from "@/data/store/store";
import { ActionTree } from "vuex";
import { API } from "@/data/api/API";
import { RacingHorse } from "@/domain/model/Horse";
import { ContestState } from "@/data/store/modules/contest/contestState";
import { Judge } from "@/domain/model/Judge";
import { Rank } from "@/domain/model/Rank";
import { socket } from "@/data/sockets/socketManager";

export const actions: ActionTree<ContestState, RootState> = {
  homeCreated: ({ dispatch }) => {
    socket.emit("connected");
    socket.on("horses", (data: RacingHorse[]) => {
      dispatch("horsesFetchedFromSocket", data).catch();
    });
    socket.on("judges", (data: Judge[]) => {
      dispatch("judgesFetchedFromSocket", data).catch();
    });
    socket.on("ranks", (data: Rank[]) => {
      dispatch("ranksFetchedFromSocket", data).catch();
    });
  },
  homeDestroyed: () => {
    socket.removeAllListeners();
  },

  horsesFetchedFromSocket({ commit }, horses: RacingHorse[]) {
    commit("horsesFetched", horses);
  },
  horseUpdated({ commit }, horse: RacingHorse) {
    commit("horseUpdated", horse);
  },
  async horsesReordered({ commit }, horses: RacingHorse[]) {
    commit("loading");
    const { data } = await API.reorderHorses(horses);
    commit("horsesFetched", data);
  },
  async fetchHorses({ commit }) {
    commit("loading");
    const { data } = await API.getHorses();
    commit("horsesFetched", data);
  },
  async deleteHorse({ commit }, horse: RacingHorse) {
    commit("loading");
    await API.deleteHorse(horse.id);
    commit("horseDeleted", horse);
  },

  async fetchJudges({ commit }) {
    commit("loading");
    const { data } = await API.getJudges();
    commit("judgesFetched", data);
  },
  judgesFetchedFromSocket({ commit }, judges: Judge[]) {
    commit("judgesFetched", judges);
  },

  async fetchRanks({ commit }) {
    commit("loading");
    const { data } = await API.getRanks();
    commit("ranksFetched", data);
  },
  ranksFetchedFromSocket({ commit }, ranks: Rank[]) {
    commit("ranksFetched", ranks);
  }
};
