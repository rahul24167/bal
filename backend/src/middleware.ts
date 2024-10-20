import * as jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
const JWT_SECRET = process.env.JWT_SECRET;

interface CustomRequest extends Request {
    headers: {
      authorization: string;
    },
    userId?: string;
}
interface JwtPayloadWithUserId extends jwt.JwtPayload {
    userId: string;
  }
const authMiddleware =(req:CustomRequest,res:Response,next:NextFunction) => {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(403).json({});
    }
    const token = authHeader.split(' ')[1];
    try{
        const decoded = jwt.verify(token, JWT_SECRET as string) as JwtPayloadWithUserId;
        if(decoded.userId){
            req.userId = decoded.userId;
            next();
        }else{
            return res.status(403).json({});
        }
        
    }catch(err){
        return res.status(403).json({});
    }
};

export default authMiddleware;