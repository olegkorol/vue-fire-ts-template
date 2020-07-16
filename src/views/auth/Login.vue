<template>
  <div class="page-wrapper">
    <!-- Loader -->
    <v-row align="center">
      <v-alert v-if="error" prominent type="error">{{ error.message }}</v-alert>
    </v-row>
    <AuthForm v-show="user === null" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState, mapMutations } from "vuex";
import { isNil } from "lodash";
import AuthForm from "@/components/AuthForm.vue";

export default Vue.extend({
  name: "Login",
  components: {
    AuthForm,
  },
  computed: {
    ...mapState("authentication", ["user", "error"]),
  },
  watch: {
    user: {
      handler(user) {
        if (!isNil(user)) {
          const redirectUrl: any = isNil(this.$route.query.redirectUrl)
            ? "/"
            : this.$route.query.redirectUrl;
          this.$router.push(redirectUrl);
        }
      },
      immediate: true,
    },
  },
  methods: {
    ...mapMutations("authentication", ["setUser"]),
  },
});
</script>
