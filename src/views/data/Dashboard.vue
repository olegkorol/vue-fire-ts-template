<template>
  <v-container center>
    <h1 class="ma-3">Dashboard</h1>
    <Table :headers="headers" :data="users" />
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Table from "@/components/Table.vue";
import { mapState, mapActions } from "vuex";

export default Vue.extend({
  name: "Dashboard",
  components: {
    Table,
  },
  data: () => {
    return {
      headers: [
        { text: "Email", value: "email" },
        { text: "Email verified", value: "emailVerified" },
        { text: "Created on", value: "createTimestamp" },
        { text: "Updated on", value: "updateTimestamp" },
      ],
    };
  },
  computed: mapState("firestore", ["users"]),
  created() {
    this.bindUsers();
  },
  methods: mapActions("firestore", ["bindUsers"]),
});
</script>
