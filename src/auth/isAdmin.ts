type Role = "Admin" | "User";

class Users {
  private userAdminStatus = true;

  constructor() {}

  isAdmin(): boolean {
    return this.userAdminStatus;
  }
  setRoleType(role: Role) {
    console.log("Inicio sett Role");
    if (role === "Admin") {
      console.log("Cambiando a ADmin");
      this.userAdminStatus = true;
    }
    if (role === "User") {
      console.log("Cambiando a user");
      this.userAdminStatus = false;
    }
  }
}
const user: Users = new Users();

export default user;
