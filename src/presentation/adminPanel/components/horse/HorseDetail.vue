<template>
  <div class="horseDetailWrapper">
    <Dropdown label="Klasa" :chosen-value.sync="rank" :values="rankConfig" />
    <TextInput label="Imię konia" :value.sync="name" />
    <TextInput label="Kraj" :value.sync="country" />
    <Dropdown
      label="Rok urodzenia"
      :chosen-value.sync="YOB"
      :values="yearConfig"
    />
    <TextInput label="Kolor" :value.sync="color" />
    <Dropdown label="Płeć" :chosen-value.sync="sex" :values="sexConfig" />
    <TextInput label="Nazwa hodowcy" :value.sync="breederName" />
    <TextInput label="Kraj hodowcy" :value.sync="breederCountry" />
    <TextInput label="Nazwa właściciela" :value.sync="ownerName" />
    <TextInput label="Kraj właściciela" :value.sync="ownerCountry" />
    <TextInput label="Nazwa ojca konia" :value.sync="fatherName" />
    <TextInput label="Kraj ojca konia" :value.sync="fatherCountry" />
    <TextInput label="Nazwa matki konia" :value.sync="motherName" />
    <TextInput label="Kraj matki konia" :value.sync="motherCountry" />
    <TextInput label="Nazwa ojca matki konia" :value.sync="mothersFatherName" />
    <TextInput
      label="Kraj ojca matki konia"
      :value.sync="mothersFatherCountry"
    />
    <Error :errors="errors" />
    <CustomButton @clicked="save" text="Zapisz" :is-enabled="isClickable" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import CustomButton from "@/presentation/commons/components/CustomButton.vue";
import { RacingHorse } from "@/domain/model/Horse";
import TextInput from "@/presentation/adminPanel/components/common/TextInput.vue";
import { getRankName, Rank } from "@/domain/model/Rank";
import Dropdown from "@/presentation/adminPanel/components/common/Dropdown.vue";
import _ from "lodash";
import Error from "@/presentation/commons/Error.vue";
import { APIError } from "@/domain/model/APIError";
import { Getter } from "vuex-class";
import { validateAllValues } from "@/presentation/commons/extensions";

@Component({
  components: {
    Error,
    Dropdown,
    TextInput,
    CustomButton
  }
})
export default class HorseDetail extends Vue {
  @Getter errors!: APIError[];
  rank = "";
  name = "";
  country = "";
  yearOfBirth = 0;
  color = "";
  sex = "";
  breederName = "";
  breederCountry = "";
  ownerName = "";
  ownerCountry = "";
  fatherName = "";
  fatherCountry = "";
  motherName = "";
  motherCountry = "";
  mothersFatherName = "";
  mothersFatherCountry = "";

  created() {
    const horse = this.$store.state.contest.horses.find(
      (item: RacingHorse) => item.id == this.$route.params.id
    );
    this.bindValues(horse);
  }

  get ranks(): Rank[] {
    return this.$store.getters.ranks;
  }

  get rankConfig(): any {
    return this.ranks.map(it => {
      return { id: it.id, text: getRankName(it) };
    });
  }

  rankChanged(id: string) {
    this.rank = id;
  }

  get YOB(): string {
    const yob = this.yearOfBirth;
    if (yob == 0) return "";
    else return yob.toString();
  }

  set YOB(value) {
    this.yearOfBirth = parseInt(value);
  }

  get yearConfig(): any {
    return _.range(1950, new Date().getFullYear()).map(it => {
      return { id: it, text: it };
    });
  }

  yearChanged(number: string) {
    this.yearOfBirth = parseInt(number);
  }

  get sexConfig(): any {
    return [
      {
        id: "kl.",
        name: "Klacz"
      },
      {
        id: "og.",
        name: "Ogier"
      }
    ].map(it => {
      return { id: it.id, text: it.name };
    });
  }

  sexChanged(sex: string) {
    this.sex = sex;
  }

  private bindValues(horse: RacingHorse | undefined) {
    if (horse == undefined) {
      return;
    }

    this.rank = horse.rank.id;
    this.name = horse.name;
    this.country = horse.country;
    this.yearOfBirth = horse.yearOfBirth;
    this.color = horse.color;
    this.sex = horse.sex;
    this.breederName = horse.breeder.name;
    this.breederCountry = horse.breeder.country;
    this.ownerName = horse.owner.name;
    this.ownerCountry = horse.owner.country;
    this.fatherName = horse.lineage.father.name;
    this.fatherCountry = horse.lineage.father.country;
    this.motherName = horse.lineage.mother.name;
    this.motherCountry = horse.lineage.mother.country;
    this.mothersFatherName = horse.lineage.mothersFather.name;
    this.mothersFatherCountry = horse.lineage.mothersFather.country;
  }

  get isClickable() {
    return validateAllValues(this.$data);
  }

  save() {
    let horse = this.$store.state.contest.horses.find(
      (item: RacingHorse) => item.id == this.$route.params.id
    );
    if (horse) {
      horse = this.updateHorseValues(horse);
      this.$store.dispatch("updateHorse", horse).then(() => {
        this.$router.replace("/horses");
      });

      return;
    }

    horse = this.createHorse();

    this.$store.dispatch("createHorse", horse).then(() => {
      this.$router.replace("/horses");
    });
  }

  private createHorse() {
    return {
      name: this.name,
      country: this.country,
      id: "-1",
      number: -1,
      rank: { id: this.rank },
      yearOfBirth: this.yearOfBirth,
      color: this.color,
      sex: this.sex,
      breeder: {
        name: this.breederName,
        country: this.breederCountry
      },
      owner: {
        name: this.ownerName,
        country: this.ownerCountry
      },
      lineage: {
        mother: {
          name: this.motherName,
          country: this.motherCountry
        },
        father: {
          name: this.fatherName,
          country: this.fatherCountry
        },
        mothersFather: {
          name: this.mothersFatherName,
          country: this.mothersFatherCountry
        }
      },
      arbitratorValue: -1,
      notes: []
    };
  }

  updateHorseValues(horse: RacingHorse): RacingHorse {
    horse.rank.id = this.rank;
    horse.name = this.name;
    horse.country = this.country;
    horse.yearOfBirth = this.yearOfBirth;
    horse.color = this.color;
    horse.sex = this.sex;
    horse.breeder.name = this.breederName;
    horse.breeder.country = this.breederCountry;
    horse.owner.name = this.ownerName;
    horse.owner.country = this.ownerCountry;
    horse.lineage.father.name = this.fatherName;
    horse.lineage.father.country = this.fatherCountry;
    horse.lineage.mother.name = this.motherName;
    horse.lineage.mother.country = this.motherCountry;
    horse.lineage.mothersFather.name = this.mothersFatherName;
    horse.lineage.mothersFather.country = this.mothersFatherCountry;

    return horse;
  }
}
</script>

<style scoped lang="scss"></style>
