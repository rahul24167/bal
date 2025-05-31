import express from 'express';
const router = express.Router();

import userRouter from './user';
import dashboardRouter from './dashboard';

router.use("/user", userRouter);
router.use("/dashboard", dashboardRouter);

export default router;

