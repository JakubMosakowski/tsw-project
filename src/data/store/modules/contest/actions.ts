import { RootState } from "@/data/store/store";
import { ActionTree } from "vuex";
import { API } from "@/data/api/API";
import { RacingHorse } from "@/domain/model/Horse";
import { ContestState } from "@/data/store/modules/contest/contestState";
import { Judge } from "@/domain/model/Judge";
import { Rank } from "@/domain/model/Rank";
import { socket } from "@/data/sockets/socketManager";
import { convertHorseToApiVersion } from "@/domain/model/ApiRacingHorse";

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
  setError: ({ commit }, e) => {
    const errors = e.response.data.errors
      .map((item: Error) => {
        if (item.msg.toLowerCase() == "invalid value") {
          return "";
        } else {
          return item.msg;
        }
      })
      .filter((item: string) => item != "");
    commit("setError", errors);
  },

  horsesFetchedFromSocket({ commit }, horses: RacingHorse[]) {
    commit("horsesFetched", horses);
  },
  async horsesReordered({ commit }, horses: RacingHorse[]) {
    commit("loading");
    //todo error handling
    // const { data } = await API.reorderHorses(horses);
    // commit("horsesFetched", data);
  },
  async fetchHorses({ commit }) {
    commit("loadingHorses");
    const { data } = await API.getHorses();
    commit("horsesFetched", data);
  },
  async updateHorse({ dispatch, commit }, horse: RacingHorse) {
    commit("loading");
    const apiHorse = convertHorseToApiVersion(horse);
    API.updateHorse(horse.id, apiHorse)
      .then(data => {
        commit("horseUpdated", data);
      })
      .catch(e => {
        dispatch("setError", e);
      });
  },
  async deleteHorse({ commit }, horse: RacingHorse) {
    commit("loading");
    await API.deleteHorse(horse.id);
    commit("horseDeleted", horse);
  },

  async fetchJudges({ commit }) {
    commit("loadingJudges");
    const { data } = await API.getJudges();
    commit("judgesFetched", data);
  },
  judgesFetchedFromSocket({ commit }, judges: Judge[]) {
    commit("judgesFetched", judges);
  },

  async fetchRanks({ commit }) {
    commit("loadingRanks");
    const { data } = await API.getRanks();
    commit("ranksFetched", data);
  },
  ranksFetchedFromSocket({ commit }, ranks: Rank[]) {
    commit("ranksFetched", ranks);
  }
};
