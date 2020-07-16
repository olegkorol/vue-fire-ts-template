import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "@/firebase/init";
import "@/firebase/auth/listener";
import vuetify from "@/plugins/vuetify";

import pkg from "../package.json";
console.info(`v.${pkg.version}`);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
