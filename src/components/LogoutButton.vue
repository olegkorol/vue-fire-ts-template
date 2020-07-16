<template>
  <v-row align="center">
    <v-btn x-large color="red" class="mr-4" @click="signOut">Log out</v-btn>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { signOut } from "@/firebase/auth/sdk-methods";

@Component
export default class AuthForm extends Vue {
  private signOut(): void {
    // Calling function directly, as an example
    // (Best practice would be to use an action)
    signOut();
  }
}
</script>
