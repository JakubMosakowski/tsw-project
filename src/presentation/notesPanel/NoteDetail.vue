<template>
  <div v-if="horse" class="noteDetailWrapper">
    <h1>{{ horse.name }}</h1>
    <table>
      <TableHeader />
      <template v-for="(note, index) in notes">
        <NotesRow
          v-bind:key="note.judge.id"
          :notes="note"
          :row="index"
          @valueUpdated="valueUpdated"
        />
      </template>
    </table>

    <div id="sums">
      <div id="sumLeft" class="box">{{ sumLeft }}</div>
      <div id="sumAll" class="box">{{ sumAll }}</div>
      <div id="sumRight" class="box">{{ sumRight }}</div>
    </div>
    <CustomButton @clicked="save" text="Zapisz" />
    <Error :errors="errors" />
  </div>
</template>
<script lang="ts">
//TODO rozjemca
//TODO checkbox na ustawianie zakończonych.
//TODO przenoś do listy koni po akceptacji
import Vue from "vue";
import Component from "vue-class-component";
import CustomButton from "@/presentation/commons/components/CustomButton.vue";
import { Notes, RacingHorse } from "@/domain/model/Horse";
import TableHeader from "@/presentation/notesPanel/TableHeader.vue";
import NotesRow from "@/presentation/notesPanel/NotesRow.vue";
import { Getter } from "vuex-class";
import Error from "@/presentation/commons/Error.vue";

@Component({
  components: {
    Error,
    CustomButton,
    TableHeader,
    NotesRow
  }
})
export default class NoteDetail extends Vue {
  @Getter errors!: Error[];
  @Getter horseById!: (id: string) => RacingHorse;
  horse!: RacingHorse;

  created() {
    this.horse = this.horseById(this.$route.params.id);
  }

  save() {
    this.$store
      .dispatch("updateHorse", this.horse)
      .then(() => this.$router.push("/notesPanel"))
      .catch();
  }

  valueUpdated(notes: Notes, row: number) {
    this.horse.notes[row] = notes;
  }

  get notes(): Notes[] {
    return this.horse.notes;
  }

  get sumLeft(): Number {
    const numbers = this.notes.map((note: Notes) => note.horseType);
    return this.sumWithRound(numbers);
  }

  get sumRight(): Number {
    const numbers = this.notes.map((note: Notes) => note.movement);
    return this.sumWithRound(numbers);
  }

  sumWithRound(array: number[]): Number {
    return (
      Math.round(10 * array.reduce((a: number, b: number) => a + b, 0)) / 10
    );
  }

  get sumAll(): Number {
    const types = this.notes
      .map((note: Notes) => note.horseType)
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

    return this.sumWithRound([types, heads, legs, logs, movements]);
  }
}
</script>

<style scoped lang="scss">
#sums {
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: 1.5rem;
  margin-top: 20px;

  #sumLeft {
    background: green;
  }

  #sumRight {
    background: white;
  }

  #sumAll {
    background: red;
  }
}

.box {
  padding: 10px;
  border-radius: 4px;
  width: 5rem;
  text-align: center;
}

.customButton {
  margin-top: 20px;
  font-size: 1rem;
}

table {
  width: 100%;
  border-spacing: 10px;
}
</style>
