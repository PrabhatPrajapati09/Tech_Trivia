import Mongoose from "mongoose";

const quizResultSchema = new Mongoose.Schema({
    quizId: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: "Quiz",
        required: true,
    },

    userId: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    username: {
        type: String,
        required: true,
        trim: true,
    },

    score: {
        type: Number,
        required: true,
        min: 0,
    },

    totalQuestions: {
        type: Number,
        required: true,
        min: 1,
    },

    percentage: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
    },

    completedAt: {
        type: Date,
        default: Date.now,
    },
});

// Index for faster leaderboard queries
quizResultSchema.index({ quizId: 1, score: -1, completedAt: -1 });

const QuizResult = Mongoose.models.QuizResult || Mongoose.model("QuizResult", quizResultSchema);

export default QuizResult;
