<template>
  <div class="noteCellWrapper">
    <p>{{ note }}</p>
    <CustomButton text="-" @clicked="minusClicked" :isEnabled="canSubtract()" />
    <CustomButton text="+" @clicked="plusClicked" :isEnabled="canAdd()" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import Component from "vue-class-component";
import CustomButton from "@/presentation/commons/components/CustomButton.vue";
@Component({
  components: { CustomButton },
  props: {
    note: Number
  }
})
export default class NoteCell extends Vue {
  plusClicked() {
    this.$emit("plusClicked");
  }

  minusClicked() {
    this.$emit("minusClicked");
  }

  canAdd() {
    return this.$props.note < 20;
  }
  canSubtract() {
    return this.$props.note > 0;
  }
}
</script>

<style lang="scss" scoped>
.noteCellWrapper {
  border: 1px solid black;
  padding: 5px;
  margin: 5px;
  display: flex;
}

.customButton {
  padding: 2px;
  margin: 2px;
}
.header {
  display: flex;
}

p {
  width: 30px;
}
</style>
