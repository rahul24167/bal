import express, { Request, Response, NextFunction} from 'express';
const router = express.Router();
import zod from 'zod';
import {Sesson, Exercise, Set} from '../db/db';
import authMiddleware from '../middleware';

const sessonBody = zod.object({
    sessonName: zod.string(),
    userId: zod.string(),
    workouts: zod.record(zod.object({
        name: zod.string(),
        sets: zod.number(),
    }))    
})
router.post("/createSession",authMiddleware, async (req, res):Promise<any> => {
    const {success} = sessonBody.safeParse(req.body)
    if(!success){
        return res.status(404).json({
            message: "Invalid session"
        })
    }
    const sessonName = req.body.sessonName;
    const userId = req.body.userId;
    const workouts = req.body.workouts;
    const sesson = await Sesson.create({
        userId: userId,
        name: sessonName,
    });
    type Workout = {
        name: string;
        sets: number;
    };   
    const workoutDocs = Object.values(workouts).map(async (workout) => {
        const w = workout as Workout;
        await Exercise.create({
        sessonId: sesson._id,
        name: w.name,
        sets: w.sets,

    })}); 
    return res.status(200).json({
        message: "Workout sesson created successfully"
    })
});
router.post("/startWorkout",authMiddleware, async (req, res):Promise<any> => {

})


export default router;