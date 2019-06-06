<template>
  <div class="adminPanelWrapper">
    <h1>Panel admina</h1>
    <CustomButton @clicked="horses" text="Konie" />
    <CustomButton @clicked="judges" text="Sędziowie" />
    <CustomButton @clicked="ranks" text="Klasy" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import CustomButton from "@/presentation/commons/components/CustomButton.vue";
@Component({
  components: { CustomButton }
})
export default class AdminPanel extends Vue {
  horses() {
    this.$router.push("/horses");
  }
  judges() {
    this.$router.push("/judges");
  }
  ranks() {
    this.$router.push("/ranks");
  }
}
</script>

<style scoped lang="scss">
.customButton {
  width: 200px;
  margin: 20px;
}
</style>
