import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import { isNil } from "lodash";
import store from "@/store";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: () => import(/* webpackChunkName: "home" */ "../views/Home.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/auth/Login.vue"),
    meta: {
      authNotRequired: true,
    },
  },
  {
    path: "/logout",
    name: "Logout",
    component: () =>
      import(/* webpackChunkName: "logout" */ "../views/auth/Logout.vue"),
  },
  {
    path: "/check-login",
    name: "Check Login",
    component: () =>
      import(
        /* webpackChunkName: "check-login" */ "../views/auth/CheckLogin.vue"
      ),
    meta: {
      authNotRequired: true,
    },
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () =>
      import(/* webpackChunkName: "dashboard" */ "../views/data/Dashboard.vue"),
  },
];

const router = new VueRouter({
  routes,
});

/**
 * Handle redirects
 */
router.beforeEach((to, from, next) => {
  if (
    !(to.meta && to.meta.authNotRequired) &&
    isNil(store.state.authentication.user)
  ) {
    const path =
      store.state.authentication.user === null ? "/login" : "/check-login";
    return next(`${path}?redirectUrl=${to.path}`);
  }
  next();
});

export default router;
