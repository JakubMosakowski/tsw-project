<template>
  <div id="loginWrapper">
    <h1>Logowanie</h1>
    <p v-if="authStatus">Wrong login or password!</p>
    <label>
      <input v-model="name" required placeholder="Nazwa" />
    </label>
    <label>
      <input v-model="password" required type="password" placeholder="Hasło" />
    </label>
    <CustomButton @clicked="login" text="Zaloguj" />
  </div>
</template>

<script lang="ts">
import CustomButton from "../commons/components/CustomButton.vue";
import Vue from "vue";
import Component from "vue-class-component";
import { Status } from "@/domain/model/Status";

@Component({
  components: {
    CustomButton
  },
  computed: {
    authStatus: function() {
      return this.$store.getters.authStatus == Status.ERROR;
    }
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

#loginWrapper {
  padding: 10px;
}

p {
  color: red;
}

input {
  margin: 10px;
}
</style>
