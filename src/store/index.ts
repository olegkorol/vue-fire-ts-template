import Vue from "vue";
import Vuex from "vuex";
import authentication from "./authentication";
import firestore from "./firestore";
import { vuexfireMutations } from "vuexfire";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  mutations: vuexfireMutations,
  modules: {
    authentication,
    firestore
  }
});
