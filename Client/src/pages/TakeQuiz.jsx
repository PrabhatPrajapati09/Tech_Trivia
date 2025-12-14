import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { quizAPI } from '../utils/apiService';
import Card from '../components/Card';
import Button from '../components/Button';
import toast from 'react-hot-toast';

const TOTAL_TIME = 15 * 60; // 15 minutes in seconds

const TakeQuiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);

  const hasSubmittedRef = useRef(false);
  const timerRef = useRef(null);

  // 🚫 Block reattempt
  useEffect(() => {
    if (localStorage.getItem(`quiz_attempted_${id}`) === "true") {
      toast.error("You have already attempted this quiz");
      navigate('/dashboard', { replace: true });
    }
  }, [id, navigate]);

  useEffect(() => {
    fetchQuiz();
  }, [id]);

  const fetchQuiz = async () => {
    try {
      const data = await quizAPI.getById(id);
      setQuiz(data);
    } catch (error) {
      toast.error("Failed to load quiz");
      navigate('/dashboard', { replace: true });
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (optionIndex) => {
    setAnswers({ ...answers, [currentQuestion]: optionIndex });
  };

  const handleSubmit = async () => {
    if (hasSubmittedRef.current) return;
    hasSubmittedRef.current = true;

    clearInterval(timerRef.current);
    localStorage.setItem(`quiz_attempted_${id}`, "true");

    let score = 0;
    quiz.questions.forEach((q, index) => {
      if (answers[index] === q.correctAnswer) score++;
    });

    try {
      await quizAPI.submitResult(id, {
        score,
        totalQuestions: quiz.questions.length
      });
    } catch {}

    navigate('/result', {
      replace: true,
      state: {
        score,
        total: quiz.questions.length,
        quizTitle: quiz.title,
        quizId: id
      }
    });
  };

  // ⏱️ TIMER (DISPLAY + AUTO SUBMIT)
  useEffect(() => {
    if (!quiz) return;

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          toast.error("Time is up! Quiz submitted.");
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [quiz]);

  // 🚨 Auto-submit on focus loss
  useEffect(() => {
    if (!quiz) return;

    const forceSubmit = () => {
      if (!hasSubmittedRef.current) {
        toast.error("Quiz auto-submitted due to focus loss");
        handleSubmit();
      }
    };

    const onVisibilityChange = () => {
      if (document.hidden) forceSubmit();
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("blur", forceSubmit);

    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("blur", forceSubmit);
    };
  }, [quiz]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${String(secs).padStart(2, '0')}`;
  };

  if (loading)
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  if (!quiz)
    return <div className="min-h-screen flex items-center justify-center">Quiz not found</div>;

  const question = quiz.questions[currentQuestion];

  return (
    <div className="min-h-screen flex justify-center pt-16 animate-fade-in">
      <div className="w-full max-w-[800px] px-4">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{quiz.title}</h2>

          <span className={`font-semibold ${
            timeLeft <= 60 ? 'text-red-600 animate-pulse' : 'text-primary'
          }`}>
            ⏱️ {formatTime(timeLeft)}
          </span>
        </div>

        {/* Progress */}
        <div className="w-full h-2 bg-surface rounded mb-8 overflow-hidden">
          <div
            className="h-full bg-primary transition-all"
            style={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }}
          />
        </div>

        {/* Question */}
        <Card>
          <h3 className="text-lg mb-6">{question.question}</h3>

          <div className="grid gap-4">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                className={`p-4 rounded-lg border text-left transition-all
                  ${answers[currentQuestion] === index
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border bg-surface hover:border-primary/50'
                  }`}
              >
                {option}
              </button>
            ))}
          </div>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            disabled={currentQuestion === 0}
            onClick={() => setCurrentQuestion(p => p - 1)}
          >
            Previous
          </Button>

          {currentQuestion === quiz.questions.length - 1 ? (
            <Button
              variant="primary"
              onClick={handleSubmit}
              disabled={Object.keys(answers).length !== quiz.questions.length}
            >
              Submit Quiz
            </Button>
          ) : (
            <Button
              variant="primary"
              onClick={() => setCurrentQuestion(p => p + 1)}
            >
              Next
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TakeQuiz;
