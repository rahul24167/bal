import express, { Request, Response, NextFunction} from 'express';
const router = express.Router();
import authMiddleware from '../middleware';
interface CustomRequest extends Request {
    headers: {
      authorization: string;
    },
    userId?: string;
}
router.post("/",authMiddleware, async (req:Request, res: Response, next: NextFunction):Promise<any> => {
    return res.status(200).json({
        message: "days  and session changed successfully"
    })
});


export default router;