<template>
  <div class="notesPanelWrapper">
    <h1>Klasy do oceny:</h1>
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
import Cell from "@/presentation/commons/components/Cell.vue";
import { Getter } from "vuex-class";
import { Rank } from "@/domain/model/Rank";

@Component({
  components: {
    Cell
  }
})
export default class NotesPanel extends Vue {
  @Getter("ranks") ranks!: Rank[];

  created() {
    this.$store.dispatch("fetchAll").catch();
  }

  getLabel(rank: Rank): string {
    return `${rank.category} ${rank.number}`;
  }

  clicked(rank: Rank) {
    this.$router.replace({ path: `/judgingPanel/${rank.id}` });
  }
}
</script>

<style scoped lang="scss"></style>
