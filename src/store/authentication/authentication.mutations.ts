import { MutationTree } from "vuex";
import { State } from "./authentication.state";

export const mutations: MutationTree<State> = {
  setUser: (state, value) => (state.user = value),
  setError: (state, value) => (state.error = value),
  setLoading: (state, value) => (state.isLoading = value),
};
