<template>
  <div class="horseReorderWrapper">
    <div v-for="horse in horses" :key="horse.id">
      <Cell :withButtons="false" :label="horse.name" />
    </div>
    <CustomButton @clicked="saveClicked" text="Zapisz" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import CustomButton from "@/presentation/commons/components/CustomButton.vue";
import { RacingHorse } from "@/domain/model/Horse";
import Cell from "@/presentation/commons/components/Cell.vue";
import { Getter } from "vuex-class";

@Component({
  components: {
    CustomButton,
    Cell
  }
})
export default class HorseReorder extends Vue {
  //TODO add reordering
  @Getter("horses") horses!: RacingHorse[];

  saveClicked() {
    this.$store
      .dispatch("horsesReordered", this.horses)
      .then(() => this.$router.push("/horses"))
      .catch(e => console.log(e));
  }
}
</script>

<style scoped lang="scss"></style>
