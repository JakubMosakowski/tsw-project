<template>
  <div class="notesRowWrapper">
    <NoteCell
      v-for="(note, index) in notesAsArray"
      :note="note"
      v-bind:key="judge.id + index"
      @minusClicked="minusClicked(note, index, row)"
      @plusClicked="plusClicked(note, index, row)"
    />
    <p>{{ judge.name + judge.country }}</p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import Component from "vue-class-component";
import { NoteNumber, Notes } from "@/domain/model/Horse";
import NoteCell from "@/presentation/notesPanel/NoteCell.vue";

@Component({
  props: {
    notes: Object,
    row: Number,
    judge: Object
  },
  components: {
    NoteCell
  }
})
//todo w panelu prowadzacego tez rob fetcha przy pokazaniu
//todo loading przy kazdym requescie ustawiaj
export default class NotesRow extends Vue {
  get notesAsArray(): Number[] {
    const notes = this.$props.notes as Notes;
    return [notes.head, notes.legs, notes.log, notes.movement, notes.type];
  }

  plusClicked(note: number, index: number, row: Number) {
    const notes = this.updateNote(this.$props.notes as Notes, index, 0.5);
    this.$emit("valueUpdated", notes, row);
  }

  minusClicked(note: Number, index: number, row: Number) {
    const notes = this.updateNote(this.$props.notes as Notes, index, -0.5);
    this.$emit("valueUpdated", notes, row);
  }

  updateNote(notes: Notes, index: number, value: number): Notes {
    switch (index) {
      case NoteNumber.TYPE:
        notes.type = notes.type + value;
        break;
      case NoteNumber.HEAD:
        notes.head = notes.head + value;
        break;
      case NoteNumber.LOG:
        notes.log = notes.log + value;
        break;
      case NoteNumber.LEGS:
        notes.legs = notes.legs + value;
        break;
      case NoteNumber.MOVEMENT:
        notes.movement = notes.movement + value;
    }

    return notes;
  }
}
</script>

<style lang="scss" scoped>
.notesRowWrapper {
  display: flex;
  justify-content: left;
}
</style>
