<template>
  <div class="rankDetailWrapper">
    <TextInput label="Kategoria" :value.sync="category" />
    <TextInput label="Numer" :value.sync="stringNumber" :isNumeric="true" />
    <h2>Sędziowie w komisji:</h2>
    <JudgesCheckboxGroup
      :judges="judges"
      :checked-values="committee"
      @updatedJudge="updatedJudge"
    />
    <Checkbox
      class="endedCheckbox"
      label="Zakończono klasę"
      :value.sync="finished"
    />
    <Error :errors="errors" />
    <CustomButton @clicked="save" text="Zapisz" :is-enabled="isClickable" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import CustomButton from "@/presentation/commons/components/CustomButton.vue";
import TextInput from "@/presentation/adminPanel/components/common/TextInput.vue";
import Dropdown from "@/presentation/adminPanel/components/common/Dropdown.vue";
import Error from "@/presentation/commons/Error.vue";
import { APIError } from "@/domain/model/APIError";
import { Getter } from "vuex-class";
import { Rank } from "@/domain/model/Rank";
import { Judge } from "@/domain/model/Judge";
import Checkbox from "@/presentation/adminPanel/components/common/Checkbox.vue";
import JudgesCheckboxGroup from "@/presentation/adminPanel/components/common/JudgesCheckboxGroup.vue";

@Component({
  components: {
    JudgesCheckboxGroup,
    Checkbox,
    Error,
    Dropdown,
    TextInput,
    CustomButton
  }
})
export default class RankDetail extends Vue {
  @Getter errors!: APIError[];
  @Getter judges!: Judge[];
  number = 0;
  category = "";
  finished = false;
  committee: Judge[] = [];

  created() {
    const rank = this.$store.state.contest.ranks.find(
      (item: Rank) => item.id == this.$route.params.id
    );
    this.bindValues(rank);
  }
  get stringNumber(): string {
    const number = this.number;
    if (number == 0) return "";
    else return number.toString();
  }

  set stringNumber(value) {
    if (value == "") this.number = 0;
    else this.number = parseInt(value);
  }

  updatedJudge({ judge, isChecked }: any) {
    if (isChecked) {
      this.committee.push(judge);
    } else {
      const index = this.committee.findIndex(it => it.id == judge.id);
      this.committee.splice(index, 1);
    }
  }

  private bindValues(rank: Rank | undefined) {
    if (rank == undefined) {
      return;
    }

    this.number = rank.number;
    this.category = rank.category;
    this.finished = rank.finished;
    this.committee = rank.committee;
  }

  get isClickable() {
    return (
      this.committee.length > 0 &&
      this.category != "" &&
      this.stringNumber != ""
    );
  }

  save() {
    let rank = this.$store.state.contest.ranks.find(
      (item: Rank) => item.id == this.$route.params.id
    );
    if (rank) {
      rank = this.updateRankValues(rank);
      this.$store.dispatch("updateRank", rank).then(() => {
        this.$router.replace("/ranks");
      });

      return;
    }

    rank = this.createRank();

    this.$store.dispatch("createRank", rank).then(() => {
      this.$router.replace("/ranks");
    });
  }

  private createRank() {
    return {
      number: this.number,
      category: this.category,
      finished: this.finished,
      committee: this.committee.map(it => it.id),
      id: "-1"
    };
  }

  updateRankValues(rank: Rank): Rank {
    rank.number = this.number;
    rank.category = this.category;
    rank.finished = this.finished;
    rank.committee = this.committee.map(
      it => this.judges.find(judge => judge.id == it.id)!
    );

    return rank;
  }
}
</script>

<style scoped lang="scss">
.endedCheckbox {
  margin-top: 30px;
  font-size: 1.5rem;
}
</style>
