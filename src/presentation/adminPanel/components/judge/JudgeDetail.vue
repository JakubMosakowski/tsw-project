<template>
  <div class="judgeDetailWrapper">
    <TextInput label="Imie i nazwisko sędziego" :value.sync="name" />
    <TextInput label="Kraj" :value.sync="country" :max-length="4" />
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
import { Judge } from "@/domain/model/Judge";
import { validateAllValues } from "@/presentation/commons/extensions";

@Component({
  components: {
    Error,
    Dropdown,
    TextInput,
    CustomButton
  }
})
export default class JudgeDetail extends Vue {
  @Getter errors!: APIError[];
  name = "";
  country = "";

  created() {
    const judge = this.$store.state.contest.judges.find(
      (item: Judge) => item.id == this.$route.params.id
    );
    this.bindValues(judge);
  }

  private bindValues(judge: Judge | undefined) {
    if (judge == undefined) {
      return;
    }

    this.name = judge.name;
    this.country = judge.country;
  }

  get isClickable() {
    return validateAllValues(this.$data);
  }

  save() {
    let judge = this.$store.state.contest.judges.find(
      (item: Judge) => item.id == this.$route.params.id
    );
    if (judge) {
      judge = this.updateJudgeValues(judge);
      this.$store.dispatch("updateJudge", judge).then(() => {
        this.$router.replace("/judges");
      });

      return;
    }

    judge = this.createJudge();

    this.$store.dispatch("createJudge", judge).then(() => {
      this.$router.replace("/judges");
    });
  }

  private createJudge() {
    return {
      name: this.name,
      country: this.country,
      id: "-1"
    };
  }

  updateJudgeValues(judge: Judge): Judge {
    judge.name = this.name;
    judge.country = this.country;

    return judge;
  }
}
</script>

<style scoped lang="scss"></style>
