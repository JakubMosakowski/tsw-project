<template>
  <div class="fanPanelWrapper">
    <div v-for="(horse, index) in horsesSorted" :key="index">
      <JudgingCell
        :label="horse.name"
        :index="index"
        :score="getSum(horse)"
        :disabled="true"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Getter } from "vuex-class";
import { RacingHorse } from "@/domain/model/Horse";
import { sumAll, sumLeft, sumRight } from "@/presentation/commons/extensions";
import JudgingCell from "@/presentation/notesPanel/JudgingCell.vue";

@Component({
  components: {
    JudgingCell
  }
})
export default class FanPanel extends Vue {
  @Getter horses!: RacingHorse[];

  get horsesByRank(): RacingHorse[] {
    return this.horses.filter(item => item.rank.id == this.$route.params.id);
  }

  created() {
    this.$store.dispatch("connectToSocket").catch();
  }

  beforeDestroy() {
    this.$store.dispatch("disconnectFromSocket").catch();
  }

  getSum(horse: RacingHorse) {
    return sumAll(horse.notes);
  }

  get horsesSorted() {
    return this.horsesByRank.sort((a, b) => {
      const sumAllA = sumAll(a.notes);
      const sumAllB = sumAll(b.notes);
      if (sumAllA != sumAllB) return sumAllB - sumAllA;

      const sumLeftA = sumLeft(a.notes);
      const sumLeftB = sumLeft(b.notes);
      if (sumLeftA != sumLeftB) return sumLeftB - sumLeftA;

      const sumRightA = sumRight(a.notes);
      const sumRightB = sumRight(b.notes);
      if (sumRightA != sumRightB) return sumRightB - sumRightA;

      return b.arbitratorValue - a.arbitratorValue;
    });
  }
}
</script>

<style scoped lang="scss"></style>
