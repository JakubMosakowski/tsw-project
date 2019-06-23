<template>
  <label class="textInputWrapper">
    {{ label }}
    <input
      type="password"
      :placeholder="placeholder"
      :value="value"
      @input="valueChange"
      :maxlength="maxLength"
    />
  </label>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({
  props: {
    placeholder: {
      type: String,
      default: ""
    },
    label: {
      type: String,
      default: ""
    },
    maxLength: {
      type: Number,
      default: 50
    },
    value: String
  }
})
export default class PasswordInput extends Vue {
  valueChange(event: any) {
    this.$emit("update:value", event.target.value);
  }
}
</script>

<style scoped lang="scss">
label {
  width: 100%;
  margin: 10px;
}
input {
  background: transparent;
  padding: 15px;
  margin-top: 10px;
  border: 1px solid black;
  border-radius: 4px;
  font-size: 1rem;
  width: 95%;
  &:hover {
    border: 3px solid blue;
    cursor: text;
  }
}
</style>
