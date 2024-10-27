import express, { Request, Response, NextFunction} from 'express';
const router = express.Router();
import zod from 'zod';
import {Sesson, Exercise, Set} from '../db/db';
import authMiddleware from '../middleware';

router.post("/",authMiddleware, async (req, res):Promise<any> => {
    const sessons = await Sesson.find({
        userId: req.body.userId
    });
    return res.status(200).json({
        sessons
    })
});

const sessonBody = zod.object({
    sessonName: zod.string(),
    userId: zod.string(),
    workouts: zod.record(zod.object({
        name: zod.string(),
        sets: zod.number(),
    }))    
});
//create a workout sesson of a perticular number of exercises
router.post("/createSesson",authMiddleware, async (req, res):Promise<any> => {
    const {success} = sessonBody.safeParse(req.body)
    if(!success){
        return res.status(404).json({
            message: "Invalid workout sesson"
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
//send all excercise of requested sessonId arranged in the workout object
router.post("/startWorkout",authMiddleware, async (req, res):Promise<any> => {
    const sessonId= req.body.sessonId;
    const Workout = await Exercise.findOne({
        sessonId
    })
    return res.status(200).json({
        Workout
    })
})
router.post("/exercisestarted", authMiddleware, async (req,res):Promise<any> =>{
    const exerciseId = req.body.exerciseId;
    const setNumber = req.body.setNumber;
    const reps = req.body.reps;
    const weight = req.body.weight;

    const set = await Set.create({
        exerciseId,
        setNumber,
        reps,
        weight
    });
    return res.status(200).json({
        message:"entery of set made succssfully"
    })
});


export default router;