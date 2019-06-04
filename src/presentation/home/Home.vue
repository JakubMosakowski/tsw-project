<template>
  <div class="homeWrapper">
    <h1>Wystawy ilość: {{ contests.length }}</h1>

    <template v-for="(contest, index) in contests">
      <h4 v-bind:key="index">Sędziowie</h4>
      <template v-for="(judge, index) in judgesInContest(contest)">
        <p v-bind:key="judge + index">
          {{ judge.name }}+ " z " +{{ judge.country }}
        </p>
      </template>
      <h4 v-bind:key="index">Konie</h4>
      <template v-for="(horse, index) in horsesInContest(contest)">
        <p v-bind:key="horse + index">
          Numer: {{ horse.number }} || Właściciel: {{ horse.name }}+ " z " +{{
            horse.country
          }}
        </p>
      </template>
      <template v-for="(rank, index) in ranksInContest(contest)">
        <p v-bind:key="rank + index"></p>
      </template>
      <template>
        <CustomSeparator v-bind:key="index" />
      </template>
    </template>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Contest } from "@/domain/model/Contest";
import { Judge } from "@/domain/model/Judge";
import { RacingHorse } from "@/domain/model/Horse";
import { Rank } from "@/domain/model/Rank";
import CustomSeparator from "@/presentation/home/components/CustomSeparator.vue";
//TODO make better css
//TODO move all views to separate components
//TODO fix errors from duplicated indexes
@Component({
  components: { CustomSeparator }
})
export default class Home extends Vue {
  get contests(): Contest[] {
    return this.$store.getters.contests;
  }

  created() {
    this.$store.dispatch("homeCreated").catch();
  }

  beforeDestroy() {
    this.$store.dispatch("homeDestroyed").catch();
  }

  horsesInContest(contest: Contest): RacingHorse[] {
    return this.$store.getters.horses.filter((item: RacingHorse) =>
      contest.horseIds.includes(item.id)
    );
  }

  judgesInContest(contest: Contest): Judge[] {
    return this.$store.getters.judges.filter((item: Judge) =>
      contest.judgeIds.includes(item.id)
    );
  }

  ranksInContest(contest: Contest): Rank[] {
    return this.$store.getters.ranks.filter((item: Rank) =>
      contest.rankIds.includes(item.id)
    );
  }
}
</script>

<style scoped lang="scss"></style>
