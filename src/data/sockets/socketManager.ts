import io from "socket.io-client";
import { APP_URL } from "@/data/api/API";

export const socket = io(APP_URL);
