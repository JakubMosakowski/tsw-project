<template>
  <div class="horsesWrapper">
    <h1 class="h1">Konie</h1>
    <div class="header">
      <CustomButton icon="sort" @clicked="reorderClicked" />
      <CustomButton icon="plus" @clicked="plusClicked" color="green" />
    </div>
    <TextInput placeholder="Szukaj" :value.sync="horseName" />
    <div v-for="horse in localHorses" :key="horse.id">
      <Cell
        :label="horse.name"
        @editClicked="editClicked(horse)"
        @deleteClicked="deleteClicked(horse)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { RacingHorse } from "@/domain/model/Horse";
import Cell from "@/presentation/commons/components/Cell.vue";
import CustomButton from "@/presentation/commons/components/CustomButton.vue";
import { Getter } from "vuex-class";
import TextInput from "@/presentation/adminPanel/components/common/TextInput.vue";
@Component({
  components: { TextInput, CustomButton, Cell }
})
export default class Horses extends Vue {
  @Getter horses!: RacingHorse[];

  horseName = "";

  get localHorses(): RacingHorse[] {
    return this.horses.filter(horse =>
      horse.name.toLowerCase().includes(this.horseName.toLowerCase())
    );
  }

  created() {
    this.$store.dispatch("fetchHorses").catch();
  }

  deleteClicked(horse: RacingHorse) {
    this.$store.dispatch("deleteHorse", horse).catch();
  }

  editClicked(horse: RacingHorse) {
    this.$router.push({ path: `/horses/${horse.id}` });
  }

  plusClicked() {
    this.$router.push({ path: `/horses/new` });
  }
  reorderClicked() {
    this.$router.push({ path: `/horseReorder` });
  }
}
</script>

<style scoped lang="scss">
.customButton {
  margin: 5px;
}
.header {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
</style>
