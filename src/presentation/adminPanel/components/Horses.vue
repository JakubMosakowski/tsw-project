<template>
  <div id="horsesWrapper">
    <h1 class="h1">Konie</h1>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Nazwa</th>
          <th>Numer</th>
          <th>Właściciel</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="horse in horses" :key="horse.id">
          <td>{{ horse.name }}</td>
          <td>{{ horse.number }}</td>
          <td>{{ humanToString(horse.owner) }}</td>
          <td class="text-right">
            <CustomButton icon="trash" color="red" />
            <CustomButton icon="edit" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { RacingHorse } from "@/domain/model/Horse";
import { API } from "@/data/api/API";
import { Human } from "@/domain/model/Human";
import CustomButton from "@/presentation/commons/components/CustomButton.vue";
@Component({
  components: { CustomButton }
})
export default class Horses extends Vue {
  horses = Array<RacingHorse>();
  //TODO Edit + delete custom buttons as separate component
  created() {
    API.getHorses().then(resp => {
      this.horses = resp.data;
    });
  }
  // noinspection JSMethodCanBeStatic
  humanToString(human: Human): string {
    return human.name + " z " + human.country;
  }
}
</script>

<style scoped lang="scss">
#customButton {
  margin: 5px;
}
</style>
