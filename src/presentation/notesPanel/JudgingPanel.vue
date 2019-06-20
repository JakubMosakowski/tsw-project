<template>
  <div class="notesPanelWrapper">
    <h1>Konie do oceny:</h1>
    <p>
      Jeżeli jest remis, arbiter może kliknąć na flagę tego konia który powinien
      być wyżej.
    </p>
    <div v-for="(horse, index) in horsesSorted" v-bind:key="index">
      <JudgingCell
        :needArbiter="needArbiter(horse)"
        :label="horse.name"
        :index="index"
        :score="getSum(horse)"
        @cellClicked="horseClicked(horse)"
        @iconClicked="iconClicked(horse)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Getter } from "vuex-class";
import { RacingHorse } from "@/domain/model/Horse";
import { Rank } from "@/domain/model/Rank";
import { sumAll, sumLeft, sumRight } from "@/presentation/commons/extensions";
import JudgingCell from "@/presentation/notesPanel/JudgingCell.vue";
import _ from "lodash";

@Component({
  components: {
    JudgingCell
  }
})
export default class JudgingPanel extends Vue {
  @Getter horses!: RacingHorse[];
  @Getter rankById!: (id: string) => Rank;
  rank!: Rank;

  get horsesByRank(): RacingHorse[] {
    return this.horses.filter(item => item.rank.id == this.rank.id);
  }

  created() {
    this.rank = this.rankById(this.$route.params.id);
  }

  mounted() {
    this.rank = this.rankById(this.$route.params.id);
  }

  getSum(horse: RacingHorse) {
    return sumAll(horse.notes);
  }

  needArbiter(horse: RacingHorse): boolean {
    const horsesByScore = _.countBy(this.horsesByRank, a =>
      this.getHorseFullScore(a)
    );

    return horsesByScore[this.getHorseFullScore(horse)] > 1;
  }

  private getAllHorsesScoresInGroup(horse: RacingHorse) {
    return this.horsesByRank
      .map(it => {
        return { horse: it, score: this.getHorseFullScore(it) };
      })
      .filter(it => it.score == this.getHorseFullScore(horse))
      .sort((a, b) => b.horse.arbitratorValue - a.horse.arbitratorValue);
  }

  getHorseFullScore = (h: RacingHorse): string => {
    const sumAllA = sumAll(h.notes);
    const sumLeftA = sumLeft(h.notes);
    const sumRightA = sumRight(h.notes);
    return `${sumAllA}-${sumLeftA}-${sumRightA}`;
  };

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

  horseClicked(horse: RacingHorse) {
    this.$router.push({ path: `/notes/${horse.id}` });
  }

  iconClicked(horse: RacingHorse) {
    horse.arbitratorValue = this.getHigherPlaceArbiterValue(horse) + 1;
    this.$store.dispatch("updateHorse", horse).catch();
  }

  getHigherPlaceArbiterValue(horse: RacingHorse): number {
    const allHorses = this.getAllHorsesScoresInGroup(horse);
    const wantedIndex = allHorses.findIndex(it => it.horse == horse) - 1;
    console.log(allHorses);
    console.log(wantedIndex);
    if (wantedIndex >= 0) return allHorses[wantedIndex].horse.arbitratorValue;
    else return horse.arbitratorValue - 1;
  }
}
</script>

<style scoped lang="scss">
.needArbiter {
  border: 2px solid blue;
}
</style>
