import express, { Request, Response, NextFunction} from 'express';
const router = express.Router();
import authMiddleware from '../middleware';

router.post("/*",authMiddleware, async (req, res):Promise<any> => {
    return res.status(200).json({success: true})
});


export default router;