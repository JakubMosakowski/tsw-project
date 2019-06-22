<template>
  <div class="homeWrapper">
    <h1>Klasy do obejrzenia</h1>
    <div v-for="rank in ranks" :key="rank.index">
      <Cell
        :label="getLabel(rank)"
        :withButtons="false"
        @cellClicked="clicked(rank)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Rank } from "@/domain/model/Rank";
import { Getter } from "vuex-class";
import Cell from "@/presentation/commons/components/Cell.vue";

@Component({
  components: {
    Cell
  }
})
export default class Home extends Vue {
  @Getter("ranks") ranks!: Rank[];

  created() {
    this.$store.dispatch("connectToSocket").catch();
  }

  getLabel(rank: Rank): string {
    return `${rank.category} ${rank.number}`;
  }

  beforeDestroy() {
    this.$store.dispatch("disconnectFromSocket").catch();
  }

  clicked(rank: Rank) {
    this.$router.replace({ path: `/fanPanel/${rank.id}` });
  }
}
</script>

<style scoped lang="scss">
.cellWrapper {
  border-radius: 4px;
  &:hover {
    border: 3px solid blue;
    cursor: pointer;
  }
}
</style>
