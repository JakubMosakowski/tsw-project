import axios, { Method } from "axios";
import { User } from "@/domain/model/User";
import { RacingHorse } from "@/domain/model/Horse";
import { getUserToken } from "@/data/storage/storageManager";
import { ApiRacingHorse } from "@/domain/model/ApiRacingHorse";

axios.defaults.headers.common["Authorization"] = `Bearer ${getUserToken()}`;
const client = axios.create();

export class API {
  static execute(method: Method, resource: string, data?: any) {
    return client({
      url: "https://tsw-project-server.herokuapp.com" + resource,
      data: data,
      method: method
    });
  }

  static login(user: User) {
    return API.execute(POST, "/login", user);
  }

  static reloadDb() {
    return API.execute(POST, "/api/reloadDb");
  }

  static getHorses() {
    return API.execute(GET, "/api/horses");
  }

  static reorderHorses(horses: RacingHorse[]) {
    const data = {
      horseNumberList: horses.map(item => {
        return { id: item.id, newNumber: item.number };
      })
    };

    return API.execute(POST, `/api/horses/rearrangeHorseNumbers`, data);
  }

  static createHorse(data: ApiRacingHorse) {
    return API.execute(POST, "/api/horses", data);
  }

  static updateHorse(id: string, horse: ApiRacingHorse) {
    return API.execute(PUT, `/api/horses/${id}`, horse);
  }

  static deleteHorse(id: string) {
    return API.execute(DELETE, `/api/horses/${id}`);
  }

  static getJudges() {
    return API.execute(GET, "/api/judges");
  }

  static getRanks() {
    return API.execute(GET, "/api/ranks");
  }
}

export const GET = "get";
export const POST = "post";
export const DELETE = "delete";
export const PUT = "put";
export const UNAUTHORIZED_CODE = 403;
