<template>
  <td class="noteCellWrapper">
    <label>
      <input
        v-model="note"
        @keypress="validateValue"
        type="number"
        step="0.5"
        max="20"
        min="0"
      />
    </label>
  </td>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import CustomButton from "@/presentation/commons/components/CustomButton.vue";
import { Watch } from "vue-property-decorator";

@Component({
  components: { CustomButton },
  props: {
    initialNote: Number
  }
})
export default class NoteCell extends Vue {
  note = 0;

  created() {
    this.note = this.$props.initialNote;
  }

  validateValue(event: KeyboardEvent) {
    const note = this.note.toString();
    const len = note.length;

    if (len == 4) event.preventDefault();
    if (event.key == "-") event.preventDefault();
  }

  @Watch("note")
  onChildChanged(val: string) {
    if (val == "") {
      val = "0";
    }
    this.$emit("valueChanged", val);
  }
}
</script>

<style lang="scss" scoped>
input {
  width: 80px;
  font-size: 1.5rem;
}

p {
  width: 30px;
}
</style>
