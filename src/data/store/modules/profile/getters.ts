import { ProfileState } from "@/data/store/modules/profile/profileState";
import { GetterTree } from "vuex";
import { RootState } from "@/data/store/modules/root/rootState";

export const getters: GetterTree<ProfileState, RootState> = {
  isLoggedIn: state => state.token
};
