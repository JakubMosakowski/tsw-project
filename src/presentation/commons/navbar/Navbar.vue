<template>
  <div class="navbarWrapper">
    <router-link :to="{ name: 'home' }">
      WYSTAWY
    </router-link>
    <router-link :to="{ name: 'adminPanel' }" v-if="isLoggedIn">
      PANEL ADMINA
    </router-link>
    <router-link :to="{ name: 'notesPanel' }" v-if="isLoggedIn">
      PANEL PROWADZĄCEGO
    </router-link>
    <a v-if="isLoggedIn" @click="logout">Wyloguj</a>
    <router-link v-else :to="{ name: 'login' }">
      LOGOWANIE
    </router-link>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Getter } from "vuex-class";

@Component
export default class Navbar extends Vue {
  @Getter isLoggedIn!: Boolean;

  logout() {
    this.$store.dispatch("logout").then(() => {
      this.$router.push("/login");
    });
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/colors";

.navbarWrapper {
  display: flex;
  flex-direction: row;
  background: $secondary-color;
  width: 100%;
  justify-content: flex-end;

  :first-child {
    position: absolute;
    left: 0;
  }
}

a {
  color: $primary-text-color !important;
  padding: 15px;
  font-weight: bold;
}

a:hover {
  color: $primary-text-color;
  text-shadow: 1px 1px 10px $secondary-text-color,
    1px 1px 10px $secondary-text-color;
  text-decoration: none;
  cursor: pointer;
}

@media screen and (max-width: 480px) {
  a {
    padding: 10px;
    font-size: 0.7em;
  }
  .navbarWrapper {
    justify-content: space-around;
  }
}
</style>
