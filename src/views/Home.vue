<template>
  <v-container center>
    <v-row justify="center" align="center">
      <h3>
        Vuextifire.ts:
        <br />Vue, Vuex, Vuetify, Firebase, TypeScript & Co.
      </h3>
    </v-row>
    <v-row justify="center" align="center">
      <v-col v-if="!user.emailVerified" cols="7">
        <p style="color: red;">
          Please check your inbox and verify your email address in order to
          proceed using this app.
        </p>
        <p style="color: red;">
          If you have verified your email address already, you might need to
          <b>reload this page</b>.
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";

export default Vue.extend({
  computed: mapState("authentication", ["user"]),
});
</script>
