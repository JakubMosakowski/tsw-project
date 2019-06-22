import { Human } from "@/domain/model/Human";
import { Horse, Lineage, RacingHorse } from "@/domain/model/Horse";

export interface PutRacingHorse extends Horse {
  rank: string;
  yearOfBirth: number;
  color: string;
  sex: string;
  breeder: Human;
  owner: Human;
  lineage: Lineage;
  notes: ApiNotes[];
}

export interface PostRacingHorse extends Horse {
  rank: string;
  yearOfBirth: number;
  color: string;
  sex: string;
  breeder: Human;
  owner: Human;
  lineage: Lineage;
}

export interface ApiNotes {
  judge: string;
  horseType: number;
  head: number;
  log: number;
  legs: number;
  movement: number;
}

export const convertHorseToPutVersion = (
  horse: RacingHorse
): PutRacingHorse => {
  let apiHorse = JSON.parse(JSON.stringify(horse));
  apiHorse.rank = horse.rank.id;
  apiHorse.notes = horse.notes.map(item => {
    return {
      judge: item.judge.id,
      horseType: item.horseType,
      head: item.head,
      log: item.log,
      legs: item.legs,
      movement: item.movement
    };
  });

  delete apiHorse.id;
  delete apiHorse.number;

  return apiHorse;
};

export const convertHorsePutToPost = (
  horse: PutRacingHorse
): PostRacingHorse => {
  let apiHorse = JSON.parse(JSON.stringify(horse));

  delete apiHorse.notes;
  delete apiHorse.arbitratorValue;

  return apiHorse;
};
