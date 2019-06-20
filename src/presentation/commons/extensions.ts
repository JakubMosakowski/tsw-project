import { Notes } from "@/domain/model/Horse";

export const sumLeft = (notes: Notes[]): number => {
  const numbers = notes.map((note: Notes) => note.horseType);
  return sumWithRound(numbers);
};

export const sumRight = (notes: Notes[]): number => {
  const numbers = notes.map((note: Notes) => note.movement);
  return sumWithRound(numbers);
};

export const sumWithRound = (array: number[]): number => {
  return Math.round(10 * array.reduce((a: number, b: number) => a + b, 0)) / 10;
};

export const sumAll = (notes: Notes[]): number => {
  const types = notes
    .map((note: Notes) => note.horseType)
    .reduce((a: number, b: number) => a + b, 0);
  const heads = notes
    .map((note: Notes) => note.head)
    .reduce((a: number, b: number) => a + b, 0);
  const legs = notes
    .map((note: Notes) => note.legs)
    .reduce((a: number, b: number) => a + b, 0);
  const logs = notes
    .map((note: Notes) => note.log)
    .reduce((a: number, b: number) => a + b, 0);
  const movements = notes
    .map((note: Notes) => note.movement)
    .reduce((a: number, b: number) => a + b, 0);

  return sumWithRound([types, heads, legs, logs, movements]);
};
