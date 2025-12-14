import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { quizAPI } from '../utils/apiService';
import Card from '../components/Card';
import Button from '../components/Button';
import { Play, BookOpen, Clock, Trophy, History } from 'lucide-react';
import toast from 'react-hot-toast';

const UserDashboard = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchQuizzes();
    }, []);

    const fetchQuizzes = async () => {
        try {
            const data = await quizAPI.getAll();
            setQuizzes(data);
        } catch (error) {
            console.error("Failed to fetch quizzes", error);
            toast.error("Failed to load quizzes");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-7xl animate-fade-in">
            {/* Header */}
            <div className="mb-12 text-center">
                <h1 className="text-5xl font-extrabold mb-4">
                    <span className="text-gradient-primary">Available</span>
                    <span className="text-text"> Quizzes</span>
                </h1>
                <p className="text-text-muted text-lg max-w-2xl mx-auto mb-6">
                    Challenge yourself and test your knowledge across various topics
                </p>
                <Link to="/history">
                    <Button variant="outline" className="px-6 py-3">
                        <History size={20} />
                        My History
                    </Button>
                </Link>
            </div>

            {loading ? (
                <div className="text-center py-20">
                    <div className="inline-block animate-pulse">
                        <div className="w-16 h-16 bg-primary/20 rounded-full mb-4"></div>
                        <p className="text-text-muted">Loading quizzes...</p>
                    </div>
                </div>
            ) : quizzes.length === 0 ? (
                <div className="glass-strong p-12 text-center rounded-3xl max-w-md mx-auto">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <BookOpen className="text-primary" size={40} />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">No quizzes available</h3>
                    <p className="text-text-muted">Check back later for new quizzes!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {quizzes.map((quiz, index) => (
                        <Card
                            key={quiz._id}
                            className="group hover:shadow-glow-lg transition-all duration-300"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="flex flex-col h-full">
                                {/* Quiz Header */}
                                <div className="mb-4">
                                    <div className="flex items-start justify-between mb-3">
                                        <h3 className="text-2xl font-bold text-text group-hover:text-gradient-primary transition-all">
                                            {quiz.title}
                                        </h3>
                                        <div className="p-2 bg-primary/10 rounded-lg">
                                            <BookOpen className="text-primary" size={20} />
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 text-text-muted text-sm">
                                        <div className="flex items-center gap-1">
                                            <Clock size={14} />
                                            <span>15 min</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Trophy size={14} />
                                            <span>{quiz.questions.length} Questions</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Button */}
                                <div className="mt-auto">
                                    <Link to={`/quiz/${quiz._id}`} className="block">
                                        <Button variant="primary" className="w-full group-hover:scale-105">
                                            <Play size={18} />
                                            Start Quiz
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UserDashboard;
