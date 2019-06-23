<template>
  <label class="dropdownWrapper">
    {{ label }}
    <select @change="valueChange" v-model="localValue">
      <option disabled selected value> -- Wybierz -- </option>
      <option v-for="value in values" :value="value.id" :key="value.id">{{
        value.text
      }}</option>
    </select>
  </label>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({
  props: {
    label: String,
    values: Array,
    chosenValue: String
  }
})
export default class Dropdown extends Vue {
  localValue = "";

  mounted() {
    this.localValue = this.$props.chosenValue;
  }
  valueChange(event: any) {
    this.$emit("update:chosenValue", event.target.value);
  }
}
</script>

<style scoped lang="scss">
label {
  width: 100%;
  margin: 10px;
}
select {
  display: block;
  margin-top: 10px;
  padding: 15px;
  width: 100%;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  font-size: 1rem;
  border: 1px solid black;
  border-radius: 4px;
  background: transparent;

  &:hover {
    border: 3px solid blue;
    cursor: pointer;
  }
}
</style>
