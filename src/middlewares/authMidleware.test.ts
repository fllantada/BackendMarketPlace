import {
  authMiddleware,
  adminMiddleware,
  newJwtToken,
  userMiddleware,
} from "./authMidleware";
import { Request, Response, NextFunction } from "express";

interface MyRequest extends Request {
  headers: {
    authorization: string;
  };
}

describe("authMiddleware", () => {
  it("should return 401 if no token is provided", () => {
    const req = {
      headers: {
        authorization: "",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();
    authMiddleware(req as MyRequest, res as unknown as Response, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      error: "No token provided",
    });
  });
});



