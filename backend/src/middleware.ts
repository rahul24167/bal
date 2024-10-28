import * as jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
const JWT_SECRET = process.env.JWT_SECRET;
interface JwtPayloadWithUserId {
  userId: string;
}
const authMiddleware = (req : Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(403).json({
      message: "Invalid token"
    });
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

export default authMiddleware;
