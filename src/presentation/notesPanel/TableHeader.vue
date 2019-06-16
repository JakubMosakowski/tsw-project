<template>
  <tr class="tableHeaderWrapper">
    <td>Typ</td>
    <td>Głowa</td>
    <td>Kłoda</td>
    <td>Nogi</td>
    <td>Ruch</td>
    <td>Sędzia</td>
  </tr>
</template>

<script lang="ts">
import Vue from "vue";

import Component from "vue-class-component";

@Component({})
export default class TableHeader extends Vue {}
</script>

<style lang="scss" scoped>
td {
  text-align: center;
  font-weight: bold;
}
</style>
