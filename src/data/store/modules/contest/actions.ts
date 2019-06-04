import { RootState } from "@/data/store/store";
import { ActionTree } from "vuex";
import { API } from "@/data/api/API";
import { RacingHorse } from "@/domain/model/Horse";
import { ContestState } from "@/data/store/modules/contest/contestState";
import { Contest } from "@/domain/model/Contest";
import { Judge } from "@/domain/model/Judge";
import { Rank } from "@/domain/model/Rank";
import { socket } from "@/data/sockets/socketManager";

export const actions: ActionTree<ContestState, RootState> = {
  homeCreated: ({ dispatch }) => {
    socket.emit("connected");
    socket.on("contests", (data: Contest[]) => {
      dispatch("contestsFetchedFromSocket", data).catch();
    });
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

  contestsFetchedFromSocket({ commit }, contests: Contest[]) {
    commit("contestsFetchedFromSocket", contests);
  },

  horsesFetchedFromSocket({ commit }, horses: RacingHorse[]) {
    commit("horsesFetchedFromSocket", horses);
  },
  horsesReordered({ commit }, horses: RacingHorse[]) {
    return new Promise(resolve => {
      commit("loading");
      API.reorderHorses(horses)
        .then(res => {
          commit("horsesReordered", horses);
          resolve(res);
        })
        .catch(err => {
          console.log(err);
          commit("error", err);
        });
    });
  },
  horsesCreated({ commit }) {
    return new Promise(resolve => {
      commit("loading");
      API.getHorses()
        .then(res => {
          commit("horsesFetched", res.data);
          resolve(res);
        })
        .catch(err => {
          commit("error", err);
        });
    });
  },
  deleteHorse({ commit }, horse: RacingHorse) {
    return new Promise(resolve => {
      API.deleteHorse(horse.id).then(res => {
        commit("horseDeleted", horse);
        resolve(res);
      });
      resolve();
    });
  },

  judgesFetchedFromSocket({ commit }, judges: Judge[]) {
    commit("judgesFetchedFromSocket", judges);
  },

  ranksFetchedFromSocket({ commit }, ranks: Rank[]) {
    commit("ranksFetchedFromSocket", ranks);
  }
};
