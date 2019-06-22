<template>
  <div class="judgesWrapper">
    <h1 class="h1">Sędziowie</h1>
    <CustomButton icon="plus" @clicked="plusClicked" color="green" />
    <Error :errors="errors" />
    <div v-for="judge in judges" :key="judge.id">
      <Cell
        :label="judge.name"
        @editClicked="editClicked(judge)"
        @deleteClicked="deleteClicked(judge)"
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
import { Judge } from "@/domain/model/Judge";
import { APIError } from "@/domain/model/APIError";
import Error from "@/presentation/commons/Error.vue";
@Component({
  components: { Error, CustomButton, Cell }
})
export default class Judges extends Vue {
  @Getter errors!: APIError[];
  @Getter judges!: Judge[];

  created() {
    this.$store.dispatch("fetchJudges").catch();
  }

  deleteClicked(judge: Judge) {
    this.$store.dispatch("deleteJudge", judge).catch();
  }

  editClicked(judge: Judge) {
    this.$router.push({ path: `/judges/${judge.id}` });
  }

  plusClicked() {
    this.$router.push({ path: `/judges/new` });
  }
}
</script>

<style scoped lang="scss">
.customButton {
  margin: 5px;
  align-self: flex-end;
}

.judgesWrapper {
  display: flex;
  flex-direction: column;
}
</style>
