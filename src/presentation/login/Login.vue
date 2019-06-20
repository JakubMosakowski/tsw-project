<template>
  <div class="loginWrapper">
    <h1>Logowanie</h1>
    <label>
      <input v-model="name" required placeholder="Nazwa" />
    </label>
    <label>
      <input v-model="password" required type="password" placeholder="Hasło" />
    </label>
    <CustomButton @clicked="login" text="Zaloguj" />
    <Error :errors="errors" />
  </div>
</template>

<script lang="ts">
import CustomButton from "../commons/components/CustomButton.vue";
import Error from "../commons/Error.vue";
import Vue from "vue";
import Component from "vue-class-component";
import { Getter } from "vuex-class";
import { APIError } from "@/domain/model/APIError";

@Component({
  components: {
    CustomButton,
    Error
  }
})
export default class Login extends Vue {
  @Getter errors!: APIError[];

  name = "";
  password = "";

  login() {
    let name = this.name;
    let password = this.password;
    this.$store
      .dispatch("login", { login: name, password })
      .then(() => this.$router.push("/"))
      .catch();
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

.loginWrapper {
  padding: 10px;
}

p {
  color: red;
}

input {
  margin: 10px;
}
</style>
