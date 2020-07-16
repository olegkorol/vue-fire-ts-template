import { GetterTree } from "vuex";
import { State } from "./authentication.state";
import { isNil } from "lodash";

export const getters: GetterTree<State, any> = {
  isUserLoggedIn: (state) => !isNil(state.user),
};
