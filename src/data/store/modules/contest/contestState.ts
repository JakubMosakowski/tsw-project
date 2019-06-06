import { Status } from "@/domain/model/Status";
import { RacingHorse } from "@/domain/model/Horse";
import { Judge } from "@/domain/model/Judge";
import { Rank } from "@/domain/model/Rank";

export interface ContestState {
  status?: Status;
  horses: RacingHorse[];
  judges: Judge[];
  ranks: Rank[];
}
