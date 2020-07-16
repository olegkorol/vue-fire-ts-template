<template>
  <v-data-table
    :headers="headers"
    :items="data"
    :items-per-page="10"
    class="elevation-1"
  ></v-data-table>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Table extends Vue {
  @Prop() private headers: any;
  @Prop() private data: any;
}
</script>
