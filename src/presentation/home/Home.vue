<template>
  <div class="homeWrapper">
    <h1>Klasy do obejrzenia</h1>
    <TextInput placeholder="Szukaj" :value.sync="rankName" />
    <div class="cell" v-for="rank in localRanks" :key="rank.index">
      <Cell
        :label="getLabel(rank)"
        :withButtons="false"
        @cellClicked="clicked(rank)"
      />
      <font-awesome-icon v-if="rank.finished" icon="medal" size="lg" />
      <div v-else class="filler"></div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { getRankName, Rank } from "@/domain/model/Rank";
import { Getter } from "vuex-class";
import Cell from "@/presentation/commons/components/Cell.vue";
import TextInput from "@/presentation/adminPanel/components/common/TextInput.vue";

@Component({
  components: {
    TextInput,
    Cell
  }
})
export default class Home extends Vue {
  @Getter("ranks") ranks!: Rank[];
  rankName = "";

  get localRanks(): Rank[] {
    return this.ranks.filter(rank =>
      this.getLabel(rank)
        .toLowerCase()
        .includes(this.rankName.toLowerCase())
    );
  }

  created() {
    this.$store.dispatch("connectToSocket").catch();
  }

  getLabel(rank: Rank): string {
    return getRankName(rank);
  }

  beforeDestroy() {
    this.$store.dispatch("disconnectFromSocket").catch();
  }

  clicked(rank: Rank) {
    this.$router.push({ path: `/fanPanel/${rank.id}` });
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
.cell {
  display: flex;
  align-items: center;
}
.filler {
  width: 21.33px;
}
</style>
