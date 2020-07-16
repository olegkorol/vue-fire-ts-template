<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
    >
      <v-list dense>
        <template v-for="item in items">
          <v-row v-if="item.heading" :key="item.heading" align="center">
            <v-col cols="6">
              <v-subheader v-if="item.heading">{{ item.heading }}</v-subheader>
            </v-col>
            <v-col cols="6" class="text-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-col>
          </v-row>
          <v-list-group
            v-else-if="item.children"
            :key="item.text"
            v-model="item.model"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>{{ item.text }}</v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item v-for="(child, i) in item.children" :key="i" link>
              <v-list-item-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>{{ child.text }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <v-list-item v-else :key="item.text" link>
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <router-link :to="item.route">
                <v-list-item-title>{{ item.text }}</v-list-item-title>
              </router-link>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="blue darken-3"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title style="width: 300px;" class="ml-0 pl-4">
        <span class="hidden-sm-and-down">Vuextifire.ts</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <span>v.{{ version }}</span>
      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <router-view />
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";
import { isNil } from "lodash";
import pkg from "../package.json";

export default Vue.extend({
  data: () => ({
    drawer: null,
    version: pkg.version,
  }),
  computed: {
    ...mapState("authentication", ["user"]),
    items() {
      // 1. there is a this.user and it has a verified email
      // 2. there is a this.user but without a verified email
      // 3. there is no this.user
      if (!isNil(this.user) && this.user.emailVerified) {
        return [
          { icon: "mdi-home", text: "Home", route: "/" },
          {
            icon: "mdi-airplane-takeoff",
            text: "Dashboard",
            route: "/dashboard",
          },
          { icon: "mdi-account-off", text: "Logout", route: "/logout" },
        ];
      }
      if (!isNil(this.user)) {
        return [
          { icon: "mdi-home", text: "Home", route: "/" },
          { icon: "mdi-account-off", text: "Logout", route: "/logout" },
        ];
      }

      return [{ icon: "mdi-history", text: "Login", route: "/login" }];
    },
  },
});
</script>

<style lang="scss">
.v-application a {
  text-decoration: none;
  text-transform: uppercase;
}
.router-link-exact-active {
  color: gray !important;
}
</style>
