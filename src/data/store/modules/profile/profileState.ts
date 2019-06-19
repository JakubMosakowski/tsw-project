import { User } from "@/domain/model/User";

export interface ProfileState {
  user?: User;
  token: string;
}
