<template>
  <div
    class="judgingCellWrapper"
    :class="{
      first: isFirst,
      second: isSecond,
      third: isThird,
      needArbiter: needArbiter && !disabled
    }"
    @click="cellClicked"
  >
    <h3>{{ index + 1 }}.</h3>
    <h3 class="label">
      {{ label }}
    </h3>
    <div class="scoresWrapper">
      <font-awesome-icon
        class="icon"
        v-if="needArbiter"
        icon="flag"
        @click.stop="iconClicked"
        fixed-width
      />
      <p class="score">{{ score }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({
  props: {
    label: String,
    score: Number,
    index: Number,
    needArbiter: Boolean,
    hasIcon: Boolean,
    disabled: Boolean
  }
})
export default class JudgingCell extends Vue {
  cellClicked() {
    this.$emit("cellClicked");
  }
  iconClicked() {
    this.$emit("iconClicked");
  }

  get isFirst(): boolean {
    return this.$props.index == 0;
  }

  get isSecond(): boolean {
    return this.$props.index == 1;
  }

  get isThird(): boolean {
    return this.$props.index == 2;
  }
}
</script>

<style scoped lang="scss">
.judgingCellWrapper {
  display: flex;
  padding: 10px 25px;
  margin: 5px;
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

.first {
  background: #fee101;
}

.second {
  background: #d7d7d7;
}

.third {
  background: #824a02;
}

.icon {
  margin-left: 10px;
  margin-right: 10px;
  padding: 5px;
  border: 1px solid transparent;
}

.icon:hover {
  border: 1px solid gray;
  border-radius: 4px;
  cursor: pointer;
}
.needArbiter {
  border: 3px solid red;
  border-radius: 4px;
}

.score {
  font-weight: bold;
}
.scoresWrapper {
  display: flex;
  margin-left: auto;
  align-items: center;
}
</style>
