import mongoose, { Document } from "mongoose"
async ()=>{
    await mongoose.connect(process.env.MONGO_URL!);
}

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
    verificationStatus:{
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
const otpStoreSchema = new mongoose.Schema<IOtpStore>({
    email: {
        type:String,
        required: true,
    },
    otp: {
        type:Number,
        required: true,
    },
    createdAt: {
        type:Date,
        default: Date.now,
       
    }
    
})
const exerciseSchema = new mongoose.Schema({
    userid:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    excerciseName:{
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        maxLength: 30
    },
    sets:{
        type: Number,
        required: true,
        max: 50
    }

});
const setSchema = new mongoose.Schema({
    exerciseid:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Exercise'
    },
    setNumber:{
        type: Number,
        requierd: true,

    },
    reps:{
        type: Number,
        requierd: true,
    },
    weight:{
        type: Number,
        requierd: true,
    },
    dateTime:{
        type: Date,
        required: true,
        default: Date.now
    }

});

const User = mongoose.model("User", userSchema);
const OtpStore = mongoose.model("OtpStore",otpStoreSchema);
const Exercise = mongoose.model("Exercise", exerciseSchema);
const Set = mongoose.model("Set", setSchema);

export { User, OtpStore, Exercise, Set };

