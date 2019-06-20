import { RacingHorse } from "@/domain/model/Horse";
import { Judge } from "@/domain/model/Judge";
import { Rank } from "@/domain/model/Rank";

export interface ContestState {
  horses: RacingHorse[];
  judges: Judge[];
  ranks: Rank[];
}
