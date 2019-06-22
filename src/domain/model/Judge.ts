import { Human } from "./Human";

export interface Judge extends Human {
  id: string;
}

export const convertJudgeToHuman = (judge: Judge): Human => {
  const newJudge = JSON.parse(JSON.stringify(judge));
  delete newJudge.id;

  return newJudge;
};
