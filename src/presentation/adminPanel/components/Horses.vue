<template>
  <div class="horsesWrapper">
    <h1 class="h1">Konie</h1>
    <div v-for="horse in horses" :key="horse.id">
      <Cell
        :label="horse.name"
        @editClicked="editClicked(horse)"
        @deleteClicked="deleteClicked(horse)"
      />
    </div>
    <div class="footer">
      <CustomButton icon="sort" @clicked="reorderClicked" />
      <CustomButton icon="plus" @clicked="plusClicked" color="green" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { RacingHorse } from "@/domain/model/Horse";
import Cell from "@/presentation/adminPanel/components/Cell.vue";
import CustomButton from "@/presentation/commons/components/CustomButton.vue";
@Component({
  components: { CustomButton, Cell }
})
export default class Horses extends Vue {
  horses = Array<RacingHorse>();
  mounted() {
    this.$store.watch(
      (state, getters) => getters.horses,
      newValue => {
        this.horses = newValue;
      }
    );
  }
  created() {
    this.$store.dispatch("horsesCreated").catch();
  }

  deleteClicked(horse: RacingHorse) {
    this.$store.dispatch("deleteHorse", horse).catch();
  }

  editClicked(horse: RacingHorse) {
    this.$router.push({ path: `/horses/${horse.id}` });
  }
  plusClicked() {
    //todo idzie w to samo miejsce co edit ale bez id
    console.log("plus");
    // this.$router.push({ path: `/horses/` });
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
.footer {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
</style>
