<template>
  <div class="loginWrapper">
    <h1>Logowanie</h1>
    <TextInput placeholder="Login" :value.sync="name" />
    <TextInput placeholder="Hasło" :value.sync="password" />
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
import TextInput from "@/presentation/adminPanel/components/common/TextInput.vue";

@Component({
  components: {
    TextInput,
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
      .then(() => this.$router.replace("/"))
      .catch();
  }
}
</script>

<style scoped lang="scss">
h1 {
  text-align: center;
}

.textInputWrapper {
  width: 60%;
}

.loginWrapper {
  padding: 10px;
}
</style>
