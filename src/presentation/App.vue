<template>
  <div id="app">
    <Navbar />
    <router-view id="content" />
  </div>
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Montserrat:300,400,600,800");
@import "../../node_modules/bootstrap/scss/bootstrap";
@import "../../node_modules/bootstrap-vue/src/index";
@import "assets/colors";
body {
  font-family: "Montserrat", sans-serif;
  background-color: $primary-color;
  width: 100%;
}
#content {
  display: flex;
  max-width: 500px;
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
@Component({
  components: {
    Navbar
  }
})
export default class App extends Vue {}
</script>
