<template>
  <div class="notesPanelWrapper">
    <h1>Konie do oceny:</h1>
    <div v-for="(horse, index) in horsesSorted" v-bind:key="index">
      <JudgingCell
        :label="horse.name"
        :index="index"
        :score="getSum(horse)"
        @cellClicked="clicked(horse)"
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
import { sumAll } from "@/presentation/commons/extensions";
import JudgingCell from "@/presentation/notesPanel/JudgingCell.vue";

@Component({
  components: {
    JudgingCell
  }
})
//todo if forbidden to wyloguj
//todo zmien w serwerze ze wywala po roku token
//todo jeżeli ilość punktów jest taka sama to muszą być oznaczone dla rozjemcy z mozliwością rozjemania ich)
export default class JudgingPanel extends Vue {
  @Getter horsesByRank!: (id: string) => RacingHorse[];
  horses!: RacingHorse[];

  @Getter rankById!: (id: string) => Rank;
  rank!: Rank;

  created() {
    this.rank = this.rankById(this.$route.params.id);
    this.horses = this.horsesByRank(this.$route.params.id);
  }

  getSum(horse: RacingHorse) {
    return sumAll(horse.notes);
  }

  get horsesSorted() {
    return this.horses.sort((a, b) => sumAll(b.notes) - sumAll(a.notes));
  }

  clicked(horse: RacingHorse) {
    this.$router.push({ path: `/notes/${horse.id}` });
  }
}
</script>

<style scoped lang="scss"></style>
