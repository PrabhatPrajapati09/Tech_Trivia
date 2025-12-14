import express from 'express';

import {
    createQuiz,
    deleteQuiz,
    updateQuiz,
    getAllQuizzes,
    getSingleQuiz
} from '../Controller/QuizController.js';

import {
    submitQuizResult,
    getQuizLeaderboard,
    getUserQuizHistory
} from '../Controller/QuizResultController.js';

import { adminAuth } from '../Auth/adminAuth.js';
import { userAuth } from '../Auth/userAuth.js';

const router = express.Router();

// PUBLIC ROUTES
router.get("/", getAllQuizzes);
router.get("/:id", getSingleQuiz);
router.get("/:id/leaderboard", getQuizLeaderboard);

// USER ROUTES
router.get("/user/history", userAuth, getUserQuizHistory);
router.post("/:id/submit", userAuth, submitQuizResult);

// ADMIN ROUTES ONLY
router.post("/", adminAuth, createQuiz);
router.put("/:id", adminAuth, updateQuiz);
router.delete("/:id", adminAuth, deleteQuiz);

export default router;