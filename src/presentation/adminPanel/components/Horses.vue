<template>
  <div class="horsesWrapper">
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
          <td>{{ horse.owner.name + " z " + horse.owner.country }}</td>
          <td>
            <EditAndDelete
              @editClicked="editClicked(horse)"
              @deleteClicked="deleteClicked(horse)"
            />
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
import CustomButton from "@/presentation/commons/components/CustomButton.vue";
import EditAndDelete from "@/presentation/adminPanel/components/EditAndDelete.vue";
@Component({
  components: { EditAndDelete, CustomButton }
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
}
</script>

<style scoped lang="scss">
.customButton {
  margin: 5px;
}

.text-right {
  display: flex;
}
</style>
