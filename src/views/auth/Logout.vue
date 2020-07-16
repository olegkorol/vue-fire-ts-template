<template>
  <div class="page-wrapper">
    <LogoutButton />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import LogoutButton from "@/components/LogoutButton.vue";

export default Vue.extend({
  name: "Logout",
  components: {
    LogoutButton,
  },
});
</script>
