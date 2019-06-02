import { Status } from "@/model/Status";
import { User } from "@/model/User";

export interface ProfileState {
  status?: Status;
  user?: User;
  token: string;
}
