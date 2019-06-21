<template>
  <div class="horseReorderWrapper">
    <CustomButton @clicked="saveClicked" text="Zapisz" />

    <draggable
      v-bind="dragOptions"
      @start="drag = true"
      @end="drag = false"
      v-model="horsesByNumber"
    >
      <Cell
        v-for="horse in horsesByNumber"
        :key="horse.number"
        :index="horse.number"
        :withButtons="false"
        :label="horse.name"
      />
    </draggable>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import CustomButton from "@/presentation/commons/components/CustomButton.vue";
import { RacingHorse } from "@/domain/model/Horse";
import Cell from "@/presentation/commons/components/Cell.vue";
import { Getter } from "vuex-class";
//@ts-ignore
import draggable from "vuedraggable";

@Component({
  components: {
    CustomButton,
    Cell,
    draggable
  }
})
export default class HorseReorder extends Vue {
  @Getter("horses") horses!: RacingHorse[];

  localHorses: RacingHorse[] = [];

  created() {
    this.localHorses = this.horses;
  }

  get horsesByNumber() {
    return this.localHorses.sort((a, b) => {
      return a.number - b.number;
    });
  }

  set horsesByNumber(horses: RacingHorse[]) {
    this.localHorses = horses.map((h, index) => {
      h.number = index + 1;
      return h;
    });
  }

  get dragOptions() {
    return {
      animation: 200,
      ghostClass: "ghost"
    };
  }

  saveClicked() {
    this.$store
      .dispatch("horsesReordered", this.horsesByNumber)
      .then(() => this.$router.replace("/horses"))
      .catch(e => console.log(e));
  }
}
</script>

<style scoped lang="scss">
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

.cellWrapper {
  cursor: move;
}

.customButton {
  margin-bottom: 15px;
}
</style>
