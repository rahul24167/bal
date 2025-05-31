import mongoose, { Document } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// Connect to MongoDB
export const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL!);
        console.log("Database connected");
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1);
    }
};

// Define User schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 50
    },
    password: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    verificationStatus: {
        type: Boolean,
        default: false
    }
});

// Define an interface for the OTP store document
interface IOtpStore extends Document {
    email: string;
    otp: number;
    createdAt: Date;
}

// Define OTP store schema
const otpStoreSchema = new mongoose.Schema<IOtpStore>({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

// Define Session schema
const sessonSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    }
});

// Define Exercise schema
const exerciseSchema = new mongoose.Schema({
    sessionId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Sesson'
    },
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        maxLength: 30
    },
    sets: {
        type: Number,
        required: true,
        max: 50
    }
});

// Define Set schema
const setSchema = new mongoose.Schema({
    exerciseId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Exercise'
    },
    setNumber: {
        type: Number,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    dateTime: {
        type: Date,
        default: Date.now
    }
});

// Define and export models
const User = mongoose.model("User", userSchema);
const OtpStore = mongoose.model<IOtpStore>("OtpStore", otpStoreSchema);
const Sesson = mongoose.model("Sesson", sessonSchema);
const Exercise = mongoose.model("Exercise", exerciseSchema);
const Set = mongoose.model("Set", setSchema);

export { User, OtpStore, Sesson, Exercise, Set };
