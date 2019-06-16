<template>
  <tr class="notesRowWrapper">
    <NoteCell
      v-for="(note, index) in notesAsArray"
      :initialNote="note"
      v-bind:key="notes.judge.id + index"
      @valueChanged="
        note => {
          valueChanged(index, row, parseFloat(note));
        }
      "
    />

    <td>{{ notes.judge.name }}</td>
  </tr>
</template>

<script lang="ts">
import Vue from "vue";

import Component from "vue-class-component";
import { NoteNumber, Notes } from "@/domain/model/Horse";
import NoteCell from "@/presentation/notesPanel/NoteCell.vue";

@Component({
  props: {
    notes: Object,
    row: Number
  },
  components: {
    NoteCell
  }
})
export default class NotesRow extends Vue {
  get notesAsArray(): Number[] {
    const notes = this.$props.notes as Notes;
    return [notes.horseType, notes.head, notes.log, notes.legs, notes.movement];
  }

  valueChanged(index: number, row: Number, note: number) {
    const notes = this.updateNote(this.$props.notes as Notes, index, note);
    this.$emit("valueUpdated", notes, row);
  }

  updateNote(notes: Notes, index: number, value: number): Notes {
    switch (index) {
      case NoteNumber.HORSE_TYPE:
        notes.horseType = value;
        break;
      case NoteNumber.HEAD:
        notes.head = value;
        break;
      case NoteNumber.LOG:
        notes.log = value;
        break;
      case NoteNumber.LEGS:
        notes.legs = value;
        break;
      case NoteNumber.MOVEMENT:
        notes.movement = value;
    }

    return notes;
  }
}
</script>

<style lang="scss" scoped></style>
