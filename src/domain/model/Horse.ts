import { Human } from "./Human";
import { Rank } from "./Rank";
import { Judge } from "@/domain/model/Judge";

export interface RacingHorse extends Horse {
  id: string;
  number: number;
  rank: Rank;
  yearOfBirth: number;
  color: string;
  sex: string;
  breeder: Human;
  owner: Human;
  lineage: Lineage;
  arbitratorValue: number;
  notes: Notes[];
}

export interface Horse {
  name: string;
  country: string;
}

export interface Lineage {
  father: Horse;
  mother: Horse;
  mothersFather: Horse;
}

export interface Notes {
  judge: Judge;
  horseType: number;
  head: number;
  log: number;
  legs: number;
  movement: number;
}

export enum NoteNumber {
  HORSE_TYPE,
  HEAD,
  LOG,
  LEGS,
  MOVEMENT
}
