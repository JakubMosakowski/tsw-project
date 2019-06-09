<template>
  <div class="noteDetailWrapper">
    <h1>{{ horse.name }}</h1>
    <TableHeader />
    <div v-for="(judge, index) in judgesInCommittee" v-bind:key="judge.id">
      <NotesRow
        :judge="judge"
        :notes="notes[index]"
        :row="index"
        @valueUpdated="valueUpdated"
      />
    </div>
    <div id="sums">
      <div id="sumLeft">{{ sumLeft }}</div>
      <div id="sumAll">{{ sumAll }}</div>
      <div id="sumRight">{{ sumRight }}</div>
    </div>
  </div>
</template>
<script lang="ts">
//TODO insert całej bazy z generatora
//TODO rozjemca
//TODO przycisk do akceptacji
//TODO niech reaguje na zmiane ilosci
import Vue from "vue";
import Component from "vue-class-component";
import CustomButton from "@/presentation/commons/components/CustomButton.vue";
import { Notes, RacingHorse } from "@/domain/model/Horse";
import { Judge } from "@/domain/model/Judge";
import { Rank } from "@/domain/model/Rank";
import TableHeader from "@/presentation/notesPanel/TableHeader.vue";
import NotesRow from "@/presentation/notesPanel/NotesRow.vue";
import { Getter } from "vuex-class";

@Component({
  components: {
    CustomButton,
    TableHeader,
    NotesRow
  }
})
export default class NoteDetail extends Vue {
  @Getter("horses") horses!: RacingHorse[];
  @Getter("judges") judges!: Judge[];
  @Getter("ranks") ranks!: Rank[];

  get horse(): RacingHorse {
    return this.horses.find(
      (item: RacingHorse) => item.id == this.$route.params.id
    )!;
  }

  valueUpdated(notes: Notes, row: number) {
    const horse = this.horse;
    horse.notes[row] = notes;

    this.$store.dispatch("horseUpdated", horse).catch();
  }

  get notes(): Notes[] {
    return this.horse.notes;
  }

  get rank(): Rank {
    return this.horse.rank;
  }

  get judgesInCommittee(): Judge[] {
    return this.judges.filter((item: Judge) =>
      this.rank.committee.includes(item.id)
    );
  }

  get sumLeft(): Number {
    const numbers = this.notes.map((note: Notes) => note.head);
    return numbers.reduce((a: number, b: number) => a + b, 0);
  }

  get sumRight(): Number {
    const numbers = this.notes.map((note: Notes) => note.type);
    return numbers.reduce((a: number, b: number) => a + b, 0);
  }

  get sumAll(): Number {
    const types = this.notes
      .map((note: Notes) => note.type)
      .reduce((a: number, b: number) => a + b, 0);
    const heads = this.notes
      .map((note: Notes) => note.head)
      .reduce((a: number, b: number) => a + b, 0);
    const legs = this.notes
      .map((note: Notes) => note.legs)
      .reduce((a: number, b: number) => a + b, 0);
    const logs = this.notes
      .map((note: Notes) => note.log)
      .reduce((a: number, b: number) => a + b, 0);
    const movements = this.notes
      .map((note: Notes) => note.movement)
      .reduce((a: number, b: number) => a + b, 0);

    return types + heads + legs + movements + logs;
  }
}
</script>

<style scoped lang="scss">
#sums {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
</style>
