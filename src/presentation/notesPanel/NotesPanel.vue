<template>
  <div class="notesPanelWrapper">
    <h1>Klasy do oceny:</h1>
    <TextInput placeholder="Szukaj" :value.sync="rankName" />
    <div v-for="rank in localRanks" :key="rank.index">
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
import { getRankName, Rank } from "@/domain/model/Rank";
import TextInput from "@/presentation/adminPanel/components/common/TextInput.vue";

@Component({
  components: {
    TextInput,
    Cell
  }
})
export default class NotesPanel extends Vue {
  @Getter("ranks") ranks!: Rank[];
  rankName = "";

  created() {
    this.$store.dispatch("fetchAll").catch();
  }

  get localRanks(): Rank[] {
    return this.ranks.filter(rank =>
      this.getLabel(rank)
        .toLowerCase()
        .includes(this.rankName.toLowerCase())
    );
  }

  getLabel(rank: Rank): string {
    return getRankName(rank);
  }

  clicked(rank: Rank) {
    this.$router.push({ path: `/judgingPanel/${rank.id}` });
  }
}
</script>

<style scoped lang="scss">
.cellWrapper {
  &:hover {
    border-radius: 4px;
    border: 3px solid blue;
    cursor: pointer;
  }
}
</style>
