<template>
  <div v-if="horse" class="noteDetailWrapper">
    <h1>{{ horse.name }}</h1>
    <table>
      <TableHeader />
      <template v-for="(note, index) in notes">
        <NotesRow
          :key="note.judge.id"
          :notes="note"
          :row="index"
          @valueUpdated="valueUpdated"
        />
      </template>
    </table>

    <div id="sums">
      <div id="sumLeft" class="box">{{ getLeftSum }}</div>
      <div id="sumAll" class="box">{{ getAllSum }}</div>
      <div id="sumRight" class="box">{{ getRightSum }}</div>
    </div>
    <CustomButton @clicked="save" text="Zapisz" />
    <Error :errors="errors" />
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import CustomButton from "@/presentation/commons/components/CustomButton.vue";
import { Notes, RacingHorse } from "@/domain/model/Horse";
import TableHeader from "@/presentation/notesPanel/TableHeader.vue";
import NotesRow from "@/presentation/notesPanel/NotesRow.vue";
import { Getter } from "vuex-class";
import Error from "@/presentation/commons/Error.vue";
import { sumAll, sumLeft, sumRight } from "@/presentation/commons/extensions";
import { APIError } from "@/domain/model/APIError";

@Component({
  components: {
    Error,
    CustomButton,
    TableHeader,
    NotesRow
  }
})
export default class NoteDetail extends Vue {
  @Getter errors!: APIError[];
  horse!: RacingHorse;
  notes: Notes[] = [];

  created() {
    this.horse = this.$store.state.contest.horses.find(
      (it: RacingHorse) => it.id == this.$route.params.id
    );
    this.notes = this.horse.notes;
  }

  save() {
    this.$store
      .dispatch("updateHorse", this.horse)
      .then(() =>
        this.$router.replace({ path: `/judgingPanel/${this.horse.rank.id}` })
      )
      .catch();
  }

  valueUpdated(notes: Notes, row: number) {
    this.notes[row] = notes;
  }

  get getLeftSum(): Number {
    return sumLeft(this.notes);
  }

  get getRightSum(): Number {
    return sumRight(this.notes);
  }

  get getAllSum(): Number {
    return sumAll(this.notes);
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
