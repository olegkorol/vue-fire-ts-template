import { State } from "./authentication.state";
import { mutations } from "./authentication.mutations";
import { actions } from "./authentication.actions";
import { getters } from "./authentication.getters";

export default {
  namespaced: true,
  state: new State(),
  mutations,
  actions,
  getters
};
