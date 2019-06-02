<template>
  <div id="loginWrapper">
    <form class="login" @submit.prevent="login">
      <h1>Logowanie</h1>
      <label>
        <input v-model="name" required placeholder="Nazwa" />
      </label>
      <label>
        <input
          v-model="password"
          required
          type="password"
          placeholder="Hasło"
        />
      </label>
      <CustomButton type="submit" text="Zaloguj" />
    </form>
  </div>
</template>

<script lang="ts">
import CustomButton from "../commons/components/CustomButton.vue";
import Vue from "vue";
import Component from "vue-class-component";

@Component({
  components: {
    CustomButton
  }
})
export default class Login extends Vue {
  name = "";
  password = "";

  login() {
    let name = this.name;
    let password = this.password;
    this.$store
      .dispatch("login", { name, password })
      .then(() => this.$router.push("/"))
      .catch(err => console.log(err));
  }
}
</script>

<style scoped lang="scss">
h1 {
  text-align: center;
}

form {
  display: flex;
  flex-direction: column;
}

label {
  padding: 10px;
}

input {
  margin: 10px;
}
</style>
