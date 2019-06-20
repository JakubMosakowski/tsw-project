<template>
  <div class="errorsWrapper">
    <p
      v-for="(e, index) in computedErrors"
      v-bind:key="JSON.stringify(e) + index"
    >
      {{ e }}
    </p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import _ from "lodash";
import Component from "vue-class-component";
import { APIError } from "@/domain/model/APIError";

@Component({
  props: {
    errors: Array
  }
})
export default class Error extends Vue {
  get computedErrors() {
    return Object.entries(
      _.countBy(this.$props.errors.map((e: APIError) => e.msg))
    ).map(entry => {
      let key = entry[0];
      let value = entry[1];
      if (value == 1) {
        return key;
      }
      return `${value} x ${key}`;
    });
  }
}
</script>

<style lang="scss" scoped>
p {
  color: red;
}
</style>
