<template>
  <button
    id="customButton"
    :disabled="!isEnabled"
    class="btn btn-primary"
    @click="$emit('clicked')"
  >
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
      required: true
    },
    isEnabled: {
      type: Boolean,
      default: true
    }
  }
})
export default class CustomButton extends Vue {}
</script>
