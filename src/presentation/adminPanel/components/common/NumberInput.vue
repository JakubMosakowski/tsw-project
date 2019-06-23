<template>
  <label class="numberInputWrapper">
    {{ label }}
    <input
      :value="value"
      @input="valueChange"
      :placeholder="placeholder"
      type="number"
      @keypress="validateValue"
      step="1"
      min="1"
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
      default: 5
    },
    value: String
  }
})
export default class NumberInput extends Vue {
  valueChange(event: any) {
    this.$emit("update:value", event.target.value);
  }

  validateValue(event: KeyboardEvent) {
    const value = this.$props.value.toString();
    const len = value.length;

    if (len == this.$props.maxLength) event.preventDefault();
    if (
      event.key == "-" ||
      event.key == "." ||
      event.key == "," ||
      event.key == "e"
    )
      event.preventDefault();
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
