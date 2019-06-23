<template>
  <div class="ranksWrapper">
    <h1 class="h1">Klasy</h1>
    <CustomButton icon="plus" @clicked="plusClicked" color="green" />
    <TextInput placeholder="Szukaj" :value.sync="rankName" />
    <Error :errors="errors" />
    <div v-for="rank in localRanks" :key="rank.id">
      <Cell
        :label="getRankLabel(rank)"
        @editClicked="editClicked(rank)"
        @deleteClicked="deleteClicked(rank)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Cell from "@/presentation/commons/components/Cell.vue";
import CustomButton from "@/presentation/commons/components/CustomButton.vue";
import { Getter } from "vuex-class";
import { getRankName, Rank } from "@/domain/model/Rank";
import { APIError } from "@/domain/model/APIError";
import Error from "@/presentation/commons/Error.vue";
import TextInput from "@/presentation/adminPanel/components/common/TextInput.vue";
@Component({
  components: { TextInput, Error, CustomButton, Cell }
})
export default class Ranks extends Vue {
  @Getter errors!: APIError[];
  @Getter ranks!: Rank[];
  rankName = "";

  get localRanks(): Rank[] {
    return this.ranks.filter(rank =>
      this.getRankLabel(rank)
        .toLowerCase()
        .includes(this.rankName.toLowerCase())
    );
  }

  getRankLabel(rank: Rank): string {
    return getRankName(rank);
  }

  created() {
    this.$store.dispatch("fetchRanks").catch();
  }

  deleteClicked(rank: Rank) {
    this.$store.dispatch("deleteRank", rank).catch();
  }

  editClicked(rank: Rank) {
    this.$router.push({ path: `/ranks/${rank.id}` });
  }

  plusClicked() {
    this.$router.push({ path: `/ranks/new` });
  }
}
</script>

<style scoped lang="scss">
.customButton {
  margin: 5px;
  align-self: flex-end;
}

.ranksWrapper {
  display: flex;
  flex-direction: column;
}
</style>
