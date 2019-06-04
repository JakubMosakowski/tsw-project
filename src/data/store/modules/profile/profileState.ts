import { Status } from "@/domain/model/Status";
import { User } from "@/domain/model/User";

export interface ProfileState {
  status?: Status;
  user?: User;
  token: string;
}
