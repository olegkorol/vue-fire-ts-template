import { GetterTree } from "vuex";
import { State } from "./firestore.state";

export const getters: GetterTree<State, any> = {
  users: (state) => state.users,
  isActionPending: (state) => state.isActionPending,
};
