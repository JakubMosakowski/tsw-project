<template>
  <div class="adminPanelWrapper">
    <h1>Panel admina</h1>
    <CustomButton @clicked="horses" text="Konie" />
    <CustomButton @clicked="judges" text="Sędziowie" />
    <CustomButton @clicked="ranks" text="Klasy" />
    <CustomButton
      class="right"
      color="red"
      @clicked="reloadDb"
      text="Zrestartuj bazę"
    />
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
    this.$router.replace("/horses");
  }

  judges() {
    this.$router.replace("/judges");
  }

  ranks() {
    this.$router.replace("/ranks");
  }

  reloadDb() {
    this.$store.dispatch("reloadDb").catch();
  }
}
</script>

<style scoped lang="scss">
.adminPanelWrapper {
  display: flex;
  flex-direction: column;
}

.customButton {
  width: 200px;
  margin: 20px;
}

.right {
  align-self: flex-end;
}
</style>
