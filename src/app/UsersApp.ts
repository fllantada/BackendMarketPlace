import { Request, Response, NextFunction } from "express";

export class User {
  constructor(private repository: UserRepository) {}

  public isRegistered(): boolean {
    return true;
  }
  public async checkAuth(token) {
    return await this.repository.checkAuth(token);
  }

  public isAdmin(): boolean {
    return false;
  }

  public isUser(): boolean {
    return false;
  }

  public createUser(): boolean {
    return true;
  }
}
