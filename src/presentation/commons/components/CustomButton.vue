<template>
  <button
    :disabled="!isEnabled"
    class="button customButton"
    :class="[{ disabled: !isEnabled }, color]"
    @click="$emit('clicked')"
  >
    <font-awesome-icon v-if="icon" :icon="icon" fixed-width />
    {{ text }}
  </button>
</template>

<script lang="ts">
import Vue from "vue";

import Component from "vue-class-component";

@Component({
  props: {
    text: {
      type: String,
      required: false
    },
    icon: {
      type: String,
      required: false
    },
    color: {
      type: String,
      required: false
    },
    isEnabled: {
      type: Boolean,
      default: true
    }
  }
})
export default class CustomButton extends Vue {}
</script>
<style lang="scss">
@import "../../assets/colors";

.red {
  background: red !important;
  border-color: red !important;

  &:hover {
    background: darken(red, 10%) !important;
    border-color: darken(red, 10%) !important;
  }
}

.green {
  background: green !important;
  border-color: green !important;

  &:hover {
    background: darken(green, 10%) !important;
    border-color: darken(green, 10%) !important;
  }
}
.disabled {
  background: gray !important;
  border: 1px solid black !important;
  &:hover {
    cursor: default;
  }
}

.button {
  background: $primary-color;
  border-color: $primary-color;
  color: white;
  text-align: center;
  padding: 10px;
  text-decoration: none;
  display: inline-block;
  cursor: pointer;
  &:hover {
    background-color: darken($primary-color, 10%);
  }

  font-size: 1rem;
}
</style>
