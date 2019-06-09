import { RootState } from "@/data/store/store";
import { ProfileState } from "@/data/store/modules/profile/profileState";
import { GetterTree } from "vuex";
import { Status } from "@/domain/model/Status";

export const getters: GetterTree<ProfileState, RootState> = {
  isLoggedIn: state => !!state.token,
  authStatus: state => state.status,
  isError: state => state.status === Status.ERROR
};
