<template>
  <div class="judgingCellWrapper" @click="cellClicked">
    <h3>{{ index + 1 }}.</h3>
    <h3 class="label">{{ label }}</h3>
    <p>{{ score }}</p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({
  props: {
    label: String,
    score: Number,
    index: Number
  }
})
export default class JudgingCell extends Vue {
  cellClicked() {
    this.$emit("cellClicked");
  }
}
</script>

<style scoped lang="scss">
.judgingCellWrapper {
  display: flex;
  padding: 5px;
  margin: 5px;
  justify-content: center;
  align-items: center;
  width: 430px;
  border: 1px solid black;
}

.label {
  overflow-wrap: break-word;
  width: 300px;
  margin-left: 15px;
  text-align: left;
}
</style>
