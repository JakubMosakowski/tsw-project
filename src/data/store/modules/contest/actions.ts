import { RootState } from "@/data/store/store";
import { ActionTree } from "vuex";
import { API } from "@/data/api/API";
import { RacingHorse } from "@/domain/model/Horse";
import { ContestState } from "@/data/store/modules/contest/contestState";

export const actions: ActionTree<ContestState, RootState> = {
  horsesCreated({ commit }) {
    return new Promise(resolve => {
      commit("horsesLoading");
      API.getHorses()
        .then(res => {
          commit("horsesFetched", res.data);
          resolve(res);
        })
        .catch(err => {
          commit("horsesError", err);
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
  }
};
