<template>
  <div class="notesRowWrapper">
    <NoteCell
      v-for="(note, index) in notesAsArray"
      :note="note"
      v-bind:key="judge.id + index"
    />
    <p>{{ judge.name + judge.country }}</p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import Component from "vue-class-component";
import { Notes } from "@/domain/model/Horse";
import NoteCell from "@/presentation/notesPanel/NoteCell.vue";

@Component({
  props: {
    notes: Object,
    judge: Object
  },
  components: {
    NoteCell
  }
})
export default class NotesRow extends Vue {
  get notesAsArray(): Number[] {
    const notes = this.$props.notes as Notes;
    return [notes.head, notes.movement, notes.type, notes.log, notes.legs];
  }
}
</script>

<style lang="scss" scoped>
.notesRowWrapper {
  display: flex;
  justify-content: left;
}
</style>
