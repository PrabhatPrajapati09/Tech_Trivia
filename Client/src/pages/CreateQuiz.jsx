import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { quizAPI } from '../utils/apiService';
import Button from '../components/Button';
import Input from '../components/Input';
import Card from '../components/Card';
import { Plus, Trash2, Save } from 'lucide-react';
import toast from 'react-hot-toast';

const CreateQuiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [quiz, setQuiz] = useState({
    title: '',
    questions: [
      { question: '', options: ['', '', '', ''], correctAnswer: 0 }
    ]
  });

  useEffect(() => {
    if (id) fetchQuiz();
  }, [id]);

  const fetchQuiz = async () => {
    try {
      const data = await quizAPI.getById(id);
      setQuiz({
        title: data.title,
        questions: data.questions.map(q => ({
          question: q.question,
          options: q.options,
          correctAnswer: q.correctAnswer
        }))
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch quiz details");
    }
  };

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...quiz.questions];
    newQuestions[index][field] = value;
    setQuiz({ ...quiz, questions: newQuestions });
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const newQuestions = [...quiz.questions];
    newQuestions[qIndex].options[oIndex] = value;
    setQuiz({ ...quiz, questions: newQuestions });
  };

  const addQuestion = () => {
    setQuiz({
      ...quiz,
      questions: [
        ...quiz.questions,
        { question: '', options: ['', '', '', ''], correctAnswer: 0 }
      ]
    });
  };

  const removeQuestion = (index) => {
    const newQuestions = quiz.questions.filter((_, i) => i !== index);
    setQuiz({ ...quiz, questions: newQuestions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (id) {
        await quizAPI.update(id, quiz);
        toast.success("Quiz updated successfully");
      } else {
        await quizAPI.create(quiz);
        toast.success("Quiz created successfully");
      }
      navigate('/admin');
    } catch (error) {
      console.error(error);
      toast.error("Failed to save quiz");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center pt-16 animate-fade-in">
      <div className="w-full max-w-[800px] px-4">
        <h1 className="text-5xl font-bold mb-8 text-center">
          {id ? 'Edit Quiz' : 'Create New Quiz'}
        </h1>

        <form onSubmit={handleSubmit}>
          <Card className="mb-6">
            <Input
              label="Quiz Title"
              value={quiz.title}
              onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
              required
              placeholder="e.g., General Knowledge"
            />
          </Card>

          {quiz.questions.map((q, qIndex) => (
            <Card
              key={qIndex}
              className="mb-6 relative"
              title={`Question ${qIndex + 1}`}
            >
              <div className="absolute top-4 right-4">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => removeQuestion(qIndex)}
                  className="text-red-500"
                >
                  <Trash2 size={18} />
                </Button>
              </div>

              <Input
                label="Question Text"
                value={q.question}
                onChange={(e) =>
                  handleQuestionChange(qIndex, 'question', e.target.value)
                }
                required
                placeholder="What is...?"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                {q.options.map((option, oIndex) => (
                  <div key={oIndex}>
                    <Input
                      label={`Option ${oIndex + 1}`}
                      value={option}
                      onChange={(e) =>
                        handleOptionChange(qIndex, oIndex, e.target.value)
                      }
                      required
                      className={
                        q.correctAnswer === oIndex
                          ? 'border-green-500'
                          : ''
                      }
                    />

                    <label className="flex items-center gap-2 text-sm mt-1 cursor-pointer">
                      <input
                        type="radio"
                        name={`correct-${qIndex}`}
                        checked={q.correctAnswer === oIndex}
                        onChange={() =>
                          handleQuestionChange(qIndex, 'correctAnswer', oIndex)
                        }
                      />
                      Correct Answer
                    </label>
                  </div>
                ))}
              </div>
            </Card>
          ))}

          <div className="flex justify-center mb-6">
            <Button type="button" variant="outline" onClick={addQuestion}>
              <Plus size={20} /> Add Question
            </Button>
          </div>

          <div className="sticky bottom-4 z-10">
            <Button
              type="submit"
              variant="primary"
              className="w-full"
              disabled={loading}
            >
              <Save size={20} />
              {loading ? 'Saving...' : 'Save Quiz'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateQuiz;
