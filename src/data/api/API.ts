import axios, { Method } from "axios";
import { UserData } from "@/domain/model/UserData";
import { RacingHorse } from "@/domain/model/Horse";
import { getUserToken } from "@/data/storage/storageManager";
import { ApiRacingHorse } from "@/domain/model/ApiRacingHorse";

const client = axios.create();
client.defaults.headers.common["Authorization"] = `Bearer ${getUserToken()}`;
export const APP_URL = "https://tsw-project-server.herokuapp.com";

export class API {
  static execute(method: Method, resource: string, data?: any) {
    return client({
      url: APP_URL + resource,
      data: data,
      method: method
    });
  }

  static login(user: UserData) {
    return API.execute(POST, "/auth/login", user);
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
