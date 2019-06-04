<template>
  <div id="separator"></div>
</template>

<script>
import Vue from "vue";

import Component from "vue-class-component";
@Component
export default class CustomSeparator extends Vue {}
</script>

<style lang="scss" scoped>
@import "../../assets/colors";
#separator {
  width: 100%;
  height: 2px;
  background: $primary-color;
}
</style>
