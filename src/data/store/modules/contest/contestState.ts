import { Status } from "@/domain/model/Status";
import { RacingHorse } from "@/domain/model/Horse";
import { Contest } from "@/domain/model/Contest";
import { Judge } from "@/domain/model/Judge";
import { Rank } from "@/domain/model/Rank";

export interface ContestState {
  status?: Status;
  contests: Contest[];
  horses: RacingHorse[];
  judges: Judge[];
  ranks: Rank[];
}
