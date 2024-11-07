import zod from 'zod'
//for backend
export const signupBody = zod.object({
    // username: zod
    // .string()
    // .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{1,15}$/, "Username must contain at least one letter, one number, and be up to 15 characters long.")
    // .max(15, "Username must not exceed 15 characters."),
    username:zod.string().max(15, "Username must not exceed 15 characters"),
    email: zod.string().email(),
    password: zod.string()
})
//for frontend
export type signupInput = zod.infer<typeof signupBody>

export const signinBody = zod.object({
    email: zod.string().email(),
    password: zod.string()
})

export type signinInput = zod.infer<typeof signinBody>

export const sessonBody = zod.object({
    sessonName: zod.string(),
    userId: zod.string(),
    //zod.record is used for when the no. of elements of workout object is unkonwnw
    workouts: zod.record(zod.object({
        name: zod.string(),
        sets: zod.number(),
    }))    
});

export type sessonInput = zod.infer<typeof sessonBody>