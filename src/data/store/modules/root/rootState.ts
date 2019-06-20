import { Status } from "@/domain/model/Status";
import { APIError } from "@/domain/model/APIError";

export interface RootState {
  status?: Status;
  statusCode?: number;
  errors: APIError[];
}
