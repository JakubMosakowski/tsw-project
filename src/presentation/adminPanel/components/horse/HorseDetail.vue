<template>
  <div class="horseDetailWrapper">
    <TextInput label="Imię konia" v-bind:value.sync="name" />
    <TextInput label="Kraj" v-bind:value.sync="country" />
    <TextInput label="Kolor" v-bind:value.sync="color" />
    <TextInput label="Nazwa hodowcy" v-bind:value.sync="breederName" />
    <TextInput label="Kraj hodowcy" v-bind:value.sync="breederCountry" />
    <TextInput label="Nazwa właściciela" v-bind:value.sync="ownerName" />
    <TextInput label="Kraj właściciela" v-bind:value.sync="ownerCountry" />
    <TextInput label="Nazwa ojca konia" v-bind:value.sync="fatherName" />
    <TextInput label="Kraj ojca konia" v-bind:value.sync="fatherCountry" />
    <TextInput label="Nazwa matki konia" v-bind:value.sync="motherName" />
    <TextInput label="Kraj matki konia" v-bind:value.sync="motherCountry" />
    <TextInput
      label="Nazwa ojca matki konia"
      v-bind:value.sync="mothersFatherName"
    />
    <TextInput
      label="Kraj ojca matki konia"
      v-bind:value.sync="mothersFatherCountry"
    />
    <CustomButton @clicked="save" text="Zapisz" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import CustomButton from "@/presentation/commons/components/CustomButton.vue";
import { RacingHorse } from "@/domain/model/Horse";
import TextInput from "@/presentation/adminPanel/components/common/TextInput.vue";
import { Getter } from "vuex-class";
import { Rank } from "@/domain/model/Rank";

//TODO rank
//TODO rok urodzenia
//TODO płeć
@Component({
  components: {
    TextInput,
    CustomButton
  }
})
export default class HorseDetail extends Vue {
  //todo stwórz wszystkie pola + ustaw im defaul wartość jeżeli jest koń
  @Getter ranks!: Rank[];
  rank = "";
  name = "";
  country = "";
  yearOfBirth = 1950;
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
  save() {
    console.log("SAVE");
  }
}
</script>

<style scoped lang="scss"></style>
