import mongoose from "mongoose"
async ()=>{
    await mongoose.connect(env("MONGO_URL"));
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

    }
});
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
const Exercise = mongoose.model("Exercise", exerciseSchema);
const Set = mongoose.model("Set", setSchema);

export { User, Exercise, Set };

function env(arg0: string): string {
    throw new Error("Function not implemented.");
}
