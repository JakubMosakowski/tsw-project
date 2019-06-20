<template>
  <div class="app">
    <Navbar />
    <CustomSpinner v-if="isLoading" />
    <router-view v-show="!isLoading" class="content" />
  </div>
</template>

<style lang="scss">
@import "assets/colors";
body {
  font-family: Arial, "Helvetica Neue", Helvetica, sans-serif !important;
  background-color: $primary-color;
  width: 100%;
  font-size: 1rem;
  margin: 0;
}
.content {
  display: flex;
  max-width: 600px;
  flex-direction: column;
  align-items: center;
  margin: 50px auto;
  padding: 30px;
  background: $secondary-color;
}
</style>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Navbar from "@/presentation/commons/navbar/Navbar.vue";
import CustomSpinner from "@/presentation/commons/components/CustomSpinner.vue";
import { Getter } from "vuex-class";
@Component({
  components: {
    CustomSpinner,
    Navbar
  }
})
export default class App extends Vue {
  @Getter isLoading!: boolean;

  mounted() {
    this.$store.watch(
      (state, getters) => getters.isUnauthorized,
      (newValue, oldValue) => {
        if (newValue !== oldValue && newValue) {
          this.$store.dispatch("logout").then(() => {
            this.$router.replace("/login");
          });
        }
      }
    );
  }
}
</script>
