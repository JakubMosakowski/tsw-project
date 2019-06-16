import { Human } from "@/domain/model/Human";
import { Horse, Lineage, RacingHorse } from "@/domain/model/Horse";

export interface ApiRacingHorse extends Horse {
  number: number;
  rank: string;
  yearOfBirth: number;
  color: string;
  sex: string;
  breeder: Human;
  owner: Human;
  lineage: Lineage;
  notes: ApiNotes[];
}

export interface ApiNotes {
  judge: string;
  horseType: number;
  head: number;
  log: number;
  legs: number;
  movement: number;
}

export const convertHorseToApiVersion = (
  horse: RacingHorse
): ApiRacingHorse => {
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
