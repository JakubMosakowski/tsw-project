import { Judge } from "@/domain/model/Judge";

export interface Rank {
  id: string;
  number: number;
  category: string;
  committee: Judge[];
  finished: boolean;
}
