<template>
  <div class="homeWrapper">
    <template v-for="rank in ranks">
      <p v-bind:key="rank.id + 0"></p>
    </template>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Rank } from "@/domain/model/Rank";
//TODO make better css
//TODO move all views to separate components
//TODO fix errors from duplicated indexes
@Component({})
export default class Home extends Vue {
  created() {
    this.$store.dispatch("homeCreated").catch();
  }

  beforeDestroy() {
    this.$store.dispatch("homeDestroyed").catch();
  }

  get ranks(): Rank[] {
    return this.$store.getters.ranks;
  }
}
</script>

<style scoped lang="scss"></style>
