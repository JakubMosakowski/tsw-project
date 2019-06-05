<template>
  <div class="notesPanelWrapper">
    <h1>Konie do oceny:</h1>
    <div v-for="horse in horses" v-bind:key="horse.index">
      <Cell
        :label="horse.name"
        :withButtons="false"
        @cellClicked="clicked(horse)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Cell from "@/presentation/commons/components/Cell.vue";
import { RacingHorse } from "@/domain/model/Horse";

@Component({
  components: {
    Cell
  }
})
export default class NotesPanel extends Vue {
  get horses() {
    return this.$store.getters.horses;
  }
  clicked(horse: RacingHorse) {
    this.$router.push({ path: `/notes/${horse.id}` });
  }
}
</script>

<style scoped lang="scss"></style>
