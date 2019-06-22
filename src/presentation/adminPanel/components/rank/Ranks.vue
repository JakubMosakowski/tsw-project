<template>
  <div class="ranksWrapper">
    <h1 class="h1">Klasy</h1>
    <CustomButton icon="plus" @clicked="plusClicked" color="green" />
    <Error :errors="errors" />
    <div v-for="rank in ranks" :key="rank.id">
      <Cell
        :label="`${rank.category} ${rank.number}`"
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
import { Rank } from "@/domain/model/Rank";
import { APIError } from "@/domain/model/APIError";
import Error from "@/presentation/commons/Error.vue";
@Component({
  components: { Error, CustomButton, Cell }
})
export default class Ranks extends Vue {
  @Getter errors!: APIError[];
  @Getter ranks!: Rank[];

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
