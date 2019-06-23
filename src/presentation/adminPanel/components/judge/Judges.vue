<template>
  <div class="judgesWrapper">
    <h1 class="h1">Sędziowie</h1>
    <CustomButton icon="plus" @clicked="plusClicked" color="green" />
    <TextInput placeholder="Szukaj" :value.sync="judgeName" />
    <Error :errors="errors" />

    <div v-for="judge in localJudges" :key="judge.id">
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
import TextInput from "@/presentation/adminPanel/components/common/TextInput.vue";
@Component({
  components: { TextInput, Error, CustomButton, Cell }
})
export default class Judges extends Vue {
  @Getter errors!: APIError[];
  @Getter judges!: Judge[];

  judgeName = "";

  get localJudges(): Judge[] {
    return this.judges.filter(judge =>
      judge.name.toLowerCase().includes(this.judgeName.toLowerCase())
    );
  }

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
