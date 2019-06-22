import { ActionTree } from "vuex";
import { API } from "@/data/api/API";
import { RacingHorse } from "@/domain/model/Horse";
import { ContestState } from "@/data/store/modules/contest/contestState";
import { Judge } from "@/domain/model/Judge";
import { Rank } from "@/domain/model/Rank";
import { socket } from "@/data/sockets/socketManager";
import {
  convertHorsePutToPost,
  convertHorseToPutVersion
} from "@/domain/model/PutRacingHorse";
import { RootState } from "@/data/store/modules/root/rootState";

export const actions: ActionTree<ContestState, RootState> = {
  connectToSocket: ({ dispatch }) => {
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
  disconnectFromSocket: () => {
    socket.removeAllListeners();
  },
  fetchAll: ({ dispatch, commit }) => {
    commit("setLoading", null, { root: true });
    Promise.all([API.getJudges(), API.getHorses(), API.getRanks()])
      .then(values => {
        commit("fetchedAll", values);
        commit("setSuccess", null, { root: true });
      })
      .catch(e => {
        dispatch("setError", e, { root: true }).catch();
      });
  },
  reloadDb: ({ dispatch, commit }) => {
    commit("setLoading", null, { root: true });
    API.reloadDb()
      .then(() => {
        dispatch("fetchAll").catch(e =>
          dispatch("setError", e, { root: true }).catch()
        );
      })
      .catch(e => {
        dispatch("setError", e, { root: true }).catch();
      });
  },

  createHorse({ dispatch, commit }, horse: RacingHorse) {
    commit("setLoading", null, { root: true });
    const putHorse = convertHorseToPutVersion(horse);
    return new Promise(resolve => {
      API.createHorse(convertHorsePutToPost(putHorse))
        .then(({ data }) => {
          commit("horseCreated", data);
          commit("setSuccess", null, { root: true });
          resolve();
        })
        .catch(e => {
          dispatch("setError", e, { root: true }).catch();
        });
    });
  },
  fetchHorses({ dispatch, commit }) {
    commit("setLoading", null, { root: true });
    API.getHorses()
      .then(({ data }) => {
        commit("horsesFetched", data);
        commit("setSuccess", null, { root: true });
      })
      .catch(e => {
        dispatch("setError", e, { root: true }).catch();
      });
  },
  horsesFetchedFromSocket({ commit }, horses: RacingHorse[]) {
    commit("horsesFetched", horses);
  },
  horsesReordered({ dispatch, commit }, horses: RacingHorse[]) {
    commit("setLoading", null, { root: true });
    return new Promise(resolve => {
      API.reorderHorses(horses)
        .then(({ data }) => {
          commit("horsesFetched", data);
          commit("setSuccess", null, { root: true });
          resolve();
        })
        .catch(e => {
          dispatch("setError", e, { root: true }).catch();
        });
    });
  },
  updateHorse({ dispatch, commit }, horse: RacingHorse) {
    commit("setLoading", null, { root: true });
    const apiHorse = convertHorseToPutVersion(horse);
    return new Promise(resolve => {
      API.updateHorse(horse.id, apiHorse)
        .then(({ data }) => {
          commit("horseUpdated", data);
          commit("setSuccess", null, { root: true });
          resolve();
        })
        .catch(e => {
          dispatch("setError", e, { root: true }).catch();
        });
    });
  },
  deleteHorse({ dispatch, commit }, horse: RacingHorse) {
    commit("setLoading", null, { root: true });
    API.deleteHorse(horse.id)
      .then(() => {
        commit("horseDeleted", horse);
        commit("setSuccess", null, { root: true });
      })
      .catch(e => {
        dispatch("setError", e, { root: true }).catch();
      });
  },

  fetchJudges({ dispatch, commit }) {
    commit("setLoading", null, { root: true });
    API.getJudges()
      .then(({ data }) => {
        commit("judgesFetched", data);
        commit("setSuccess", null, { root: true });
      })
      .catch(e => {
        dispatch("setError", e, { root: true }).catch();
      });
  },
  judgesFetchedFromSocket({ commit }, judges: Judge[]) {
    commit("judgesFetched", judges);
  },

  fetchRanks({ dispatch, commit }) {
    commit("setLoading", null, { root: true });
    API.getRanks()
      .then(({ data }) => {
        commit("ranksFetched", data);
        commit("setSuccess", null, { root: true });
      })
      .catch(e => {
        dispatch("setError", e, { root: true }).catch();
      });
  },
  ranksFetchedFromSocket({ commit }, ranks: Rank[]) {
    commit("ranksFetched", ranks);
  }
};
