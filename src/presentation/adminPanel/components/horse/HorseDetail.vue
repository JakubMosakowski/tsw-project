<template>
  <div class="horseDetailWrapper">
    <h1>{{ horse.name }}</h1>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import CustomButton from "@/presentation/commons/components/CustomButton.vue";
import { RacingHorse } from "@/domain/model/Horse";

@Component({
  components: {
    CustomButton
  }
})
export default class HorseDetail extends Vue {
  get horse(): RacingHorse | undefined {
    return this.$store.getters.horses.find(
      (item: RacingHorse) => item.id == this.$route.params.id
    );
  }
  //todo stwórz wszystkie pola + ustaw im defaul wartość jeżeli jest koń
}
</script>

<style scoped lang="scss"></style>
