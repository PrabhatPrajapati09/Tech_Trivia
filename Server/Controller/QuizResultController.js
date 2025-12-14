import QuizResult from "../Model/QuizResultModel.js";
import Quiz from "../Model/QuizModel.js";

/**
 * Submit quiz result
 * POST /api/quiz/:id/submit
 */
export const submitQuizResult = async (req, res) => {
    try {
        const { id: quizId } = req.params;
        const { score, totalQuestions } = req.body;
        const userId = req.user._id;
        const username = req.user.username;

        // Validate quiz exists
        const quiz = await Quiz.findById(quizId);
        if (!quiz) {
            return res.status(404).json({ message: "Quiz not found" });
        }

        // Calculate percentage
        const percentage = Math.round((score / totalQuestions) * 100);

        // Create quiz result
        const quizResult = new QuizResult({
            quizId,
            userId,
            username,
            score,
            totalQuestions,
            percentage,
        });

        await quizResult.save();

        res.status(201).json({
            message: "Quiz result submitted successfully",
            result: {
                score,
                totalQuestions,
                percentage,
            },
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
};

/**
 * Get quiz leaderboard
 * GET /api/quiz/:id/leaderboard
 */
export const getQuizLeaderboard = async (req, res) => {
    try {
        const { id: quizId } = req.params;
        const limit = parseInt(req.query.limit) || 10; // Default top 10

        // Validate quiz exists
        const quiz = await Quiz.findById(quizId);
        if (!quiz) {
            return res.status(404).json({ message: "Quiz not found" });
        }

        // Get top scorers
        const leaderboard = await QuizResult.find({ quizId })
            .sort({ score: -1, completedAt: 1 }) // Higher score first, earlier completion for ties
            .limit(limit)
            .select("username score totalQuestions percentage completedAt")
            .lean();

        res.json({
            quizTitle: quiz.title,
            totalAttempts: await QuizResult.countDocuments({ quizId }),
            leaderboard,
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
};

/**
 * Get user's quiz history
 * GET /api/quiz/user/history
 */
export const getUserQuizHistory = async (req, res) => {
    try {
        const userId = req.user._id;

        // Fetch all quiz results for the user
        const history = await QuizResult.find({ userId })
            .populate("quizId", "title")
            .sort({ completedAt: -1 }) // Most recent first
            .lean();

        // Calculate statistics
        const totalAttempts = history.length;
        const averageScore = totalAttempts > 0
            ? Math.round(history.reduce((acc, result) => acc + result.percentage, 0) / totalAttempts)
            : 0;
        const bestScore = totalAttempts > 0
            ? Math.max(...history.map(result => result.percentage))
            : 0;

        res.json({
            statistics: {
                totalAttempts,
                averageScore,
                bestScore,
            },
            history: history.map(result => ({
                _id: result._id,
                quizId: result.quizId?._id,
                quizTitle: result.quizId?.title || "Unknown Quiz",
                score: result.score,
                totalQuestions: result.totalQuestions,
                percentage: result.percentage,
                completedAt: result.completedAt,
            })),
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
};
