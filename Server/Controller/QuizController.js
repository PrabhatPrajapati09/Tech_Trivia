import Quiz from "../Model/QuizModel.js";

export const createQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.create({
      ...req.body,
      createdBy: req.admin._id
    });
    res.status(201).json({ message: "Quiz created", quiz });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json({ message: "Quiz updated", quiz });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteQuiz = async (req, res) => {
  try {
    await Quiz.findByIdAndDelete(req.params.id);
    res.json({ message: "Quiz deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getSingleQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    res.json(quiz);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
