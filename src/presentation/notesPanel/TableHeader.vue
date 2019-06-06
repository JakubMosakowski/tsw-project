<template>
  <div class="tableHeaderWrapper">
    <p>Typ</p>
    <p>Głowa</p>
    <p>Kłoda</p>
    <p>Nogi</p>
    <p>Ruch</p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import Component from "vue-class-component";
@Component({})
export default class TableHeader extends Vue {}
</script>

<style lang="scss" scoped>
p {
  padding: 5px;
  margin: 5px;
  width: 80px;
}

.tableHeaderWrapper {
  display: flex;
  justify-content: left;
  width: 100%;
}
</style>
