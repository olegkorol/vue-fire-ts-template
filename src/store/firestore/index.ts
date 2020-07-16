import { State } from "./firestore.state";
import { mutations } from "./firestore.mutations";
import { actions } from "./firestore.actions";
import { getters } from "./firestore.getters";

export default {
  namespaced: true,
  state: new State(),
  mutations,
  actions,
  getters
};
