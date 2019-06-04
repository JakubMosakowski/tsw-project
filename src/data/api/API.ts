import axios, { Method } from "axios";
import { User } from "@/domain/model/User";
import { RacingHorse } from "@/domain/model/Horse";

const client = axios.create();

export class API {
  static execute(method: Method, resource: string, data?: any) {
    return client({
      url: "http://localhost:3002" + resource,
      data: data,
      method: method
    });
  }

  static login(user: User) {
    return API.execute(POST, "/login", user);
  }

  static getHorses() {
    return API.execute(GET, "/horses");
  }
  static getHorse(id: string) {
    return API.execute(GET, `/horses/${id}`);
  }
  static reorderHorses(horses: RacingHorse[]) {
    const data = {
      horseNumberList: horses.map(item => {
        return { id: item.id, newNumber: item.number };
      })
    };

    return API.execute(POST, `/rearrangeHorseNumbers`, data);
  }
  static createHorse(data: RacingHorse) {
    return API.execute(POST, "/horses", data);
  }
  static updateHorse(id: string, data: RacingHorse) {
    return API.execute(PUT, `/horses/${id}`, data);
  }
  static deleteHorse(id: string) {
    return API.execute(DELETE, `/horses/${id}`);
  }
}

export const GET = "get";
export const POST = "post";
export const DELETE = "delete";
export const PUT = "put";
