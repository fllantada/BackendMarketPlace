export class Guard {
  constructor() {}

  public static isAdmin(credentials: {
    user: string;
    password: string;
  }): boolean {
    console.log("Entre en isAdmin");
    if (credentials.user === "admin" && credentials.password === "admin") {
      console.log("por retornar true");
      return true;
    }
    console.log("por retornar false");
    return false;
  }
}
