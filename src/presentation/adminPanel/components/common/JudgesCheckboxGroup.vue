<template>
  <div class="checkboxGroupWrapper">
    <label v-for="judge in judges" :key="judge.id">
      {{ judge.name }}
      <input
        type="checkbox"
        :value="judgeInCommittee(judge)"
        @input="
          event => {
            valueChange(judge, event);
          }
        "
        :checked="judgeInCommittee(judge)"
      />
    </label>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Judge } from "@/domain/model/Judge";

@Component({
  props: {
    judges: Array,
    checkedValues: Array
  }
})
export default class JudgesCheckboxGroup extends Vue {
  valueChange(judge: Judge, event: any) {
    const isChecked = event.target.checked;
    this.$emit("updatedJudge", { judge, isChecked });
  }

  judgeInCommittee(judge: Judge) {
    return (
      this.$props.checkedValues.filter((item: any) => item.id == judge.id)
        .length > 0
    );
  }
}
</script>

<style scoped lang="scss">
label {
  margin: 10px;
}
</style>
