"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessonBody = exports.signinBody = exports.signupBody = void 0;
const zod_1 = __importDefault(require("zod"));
//for backend
exports.signupBody = zod_1.default.object({
    username: zod_1.default
        .string()
        .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{1,15}$/, "Username must contain at least one letter, one number, and be up to 15 characters long.")
        .max(15, "Username must not exceed 15 characters."),
    email: zod_1.default.string().email(),
    password: zod_1.default.string()
});
exports.signinBody = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string()
});
exports.sessonBody = zod_1.default.object({
    sessonName: zod_1.default.string(),
    userId: zod_1.default.string(),
    workouts: zod_1.default.record(zod_1.default.object({
        name: zod_1.default.string(),
        sets: zod_1.default.number(),
    }))
});
