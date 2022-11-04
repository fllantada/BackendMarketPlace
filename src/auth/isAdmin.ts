type Role = "Admin" | "User";

class Users {
  private userAdminStatus = true;

  constructor() {}

  isAdmin(): boolean {
    return this.userAdminStatus;
  }
  setRoleType(role: Role) {
    if (role === "Admin") {
      this.userAdminStatus = true;
    }
    if (role === "User") {
      this.userAdminStatus = false;
    }
  }
}
const user: Users = new Users();

export default user;
