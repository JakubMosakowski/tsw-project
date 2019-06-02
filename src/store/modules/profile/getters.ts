import { RootState } from "@/store/store";
import { ProfileState } from "@/store/modules/profile/profileState";
import { GetterTree } from "vuex";

export const getters: GetterTree<ProfileState, RootState> = {
  isLoggedIn: state => !!state.token,
  authStatus: state => state.status
};
