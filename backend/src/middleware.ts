import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

interface JwtPayloadWithUserId {
  userId: string;
}
export const authMiddleware = (req : Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(403).json({});
    return;
  }
  const token = authHeader.split(" ")[1];
  console.log(token);

  try {
    const decoded = jwt.verify(token, JWT_SECRET ?? "");
    const { userId } = decoded as JwtPayloadWithUserId;
    if (userId) {
      req.body.userId = userId;
      next();
      return;
    } else {
       res.status(403).json({});
       return;
    }
  } catch (err) {
     res.status(403).json({});
     return;
  }
};



