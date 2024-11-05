import zod from 'zod';
export declare const signupBody: zod.ZodObject<{
    username: zod.ZodString;
    email: zod.ZodString;
    password: zod.ZodString;
}, "strip", zod.ZodTypeAny, {
    username: string;
    email: string;
    password: string;
}, {
    username: string;
    email: string;
    password: string;
}>;
export type signupInput = zod.infer<typeof signupBody>;
export declare const signinBody: zod.ZodObject<{
    email: zod.ZodString;
    password: zod.ZodString;
}, "strip", zod.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export type signinInput = zod.infer<typeof signinBody>;
export declare const sessonBody: zod.ZodObject<{
    sessonName: zod.ZodString;
    userId: zod.ZodString;
    workouts: zod.ZodRecord<zod.ZodString, zod.ZodObject<{
        name: zod.ZodString;
        sets: zod.ZodNumber;
    }, "strip", zod.ZodTypeAny, {
        name: string;
        sets: number;
    }, {
        name: string;
        sets: number;
    }>>;
}, "strip", zod.ZodTypeAny, {
    sessonName: string;
    userId: string;
    workouts: Record<string, {
        name: string;
        sets: number;
    }>;
}, {
    sessonName: string;
    userId: string;
    workouts: Record<string, {
        name: string;
        sets: number;
    }>;
}>;
export type sessonInput = zod.infer<typeof sessonBody>;
