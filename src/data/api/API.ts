import axios, { Method } from "axios";
import { UserData } from "@/domain/model/UserData";
import { RacingHorse } from "@/domain/model/Horse";
import { PostRacingHorse, PutRacingHorse } from "@/domain/model/PutRacingHorse";
import { Human } from "@/domain/model/Human";
import { ApiRank } from "@/domain/model/Rank";
import { getUserToken } from "@/data/storage/storageManager";

const client = axios.create();
export const APP_URL = "https://tsw-project-server.herokuapp.com";

export class API {
  static execute(method: Method, resource: string, data?: any) {
    return client({
      url: APP_URL + resource,
      data: data,
      method: method,
      headers: {
        Authorization: `Bearer ${getUserToken()}`
      }
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

  static createHorse(data: PostRacingHorse) {
    return API.execute(POST, "/api/horses", data);
  }

  static updateHorse(id: string, horse: PutRacingHorse) {
    return API.execute(PUT, `/api/horses/${id}`, horse);
  }

  static deleteHorse(id: string) {
    return API.execute(DELETE, `/api/horses/${id}`);
  }

  static getJudges() {
    return API.execute(GET, "/api/judges");
  }

  static createJudge(data: Human) {
    return API.execute(POST, "/api/judges", data);
  }

  static updateJudge(id: string, judge: Human) {
    return API.execute(PUT, `/api/judges/${id}`, judge);
  }

  static deleteJudge(id: string) {
    return API.execute(DELETE, `/api/judges/${id}`);
  }

  static getRanks() {
    return API.execute(GET, "/api/ranks");
  }

  static createRank(data: ApiRank) {
    return API.execute(POST, "/api/ranks", data);
  }

  static updateRank(id: string, rank: ApiRank) {
    return API.execute(PUT, `/api/ranks/${id}`, rank);
  }

  static deleteRank(id: string) {
    return API.execute(DELETE, `/api/ranks/${id}`);
  }
}

export const GET = "get";
export const POST = "post";
export const DELETE = "delete";
export const PUT = "put";
export const UNAUTHORIZED_CODE = 403;
