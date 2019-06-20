export class UserData {
  constructor(login: string, token?: string, password?: string) {
    this.login = login;
    this.token = token;
    this.password = password;
  }

  login: string;
  password?: string;
  token?: string;
}
