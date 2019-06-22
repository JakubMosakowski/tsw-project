<template>
  <label>
    {{ label }}
    <input
      type="checkbox"
      :value="value"
      @input="valueChange"
      :checked="value"
    />
  </label>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({
  props: {
    label: {
      type: String,
      default: ""
    },
    value: Boolean
  }
})
export default class Checkbox extends Vue {
  valueChange() {
    this.$emit("update:value", !this.$props.value);
  }
}
</script>

<style scoped lang="scss">
label {
  margin: 10px;
}
</style>
