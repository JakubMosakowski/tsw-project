<template>
  <div id="navbarWrapper">
    <router-link :to="{ name: 'home' }">WYSTAWY</router-link>
    <router-link :to="{ name: 'adminPanel' }">PANEL ADMINA</router-link>
    <router-link :to="{ name: 'notesPanel' }">PANEL PROWADZĄCEGO</router-link>
  </div>
</template>

<script>
export default {
  name: "Navbar"
};
</script>

<style scoped lang="scss">
@import "../../assets/colors";

#navbarWrapper {
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
  color: $primary-text-color;
  padding: 15px;
  font-weight: bold;
}

a:hover {
  color: $primary-text-color;
  text-shadow: 1px 1px 10px $secondary-text-color,
    1px 1px 10px $secondary-text-color;
  text-decoration: none;
}

@media screen and (max-width: 480px) {
  a {
    padding: 10px;
    font-size: 0.7em;
  }
  #navbarWrapper {
    justify-content: space-around;
  }
}
</style>
