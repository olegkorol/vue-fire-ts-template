import { MutationTree } from "vuex";
import { State } from "./firestore.state";

export const mutations: MutationTree<State> = {
  setError: (state, value) => (state.error = value),
  setIsActionPending: (state, value) => (state.isActionPending = value),
};
