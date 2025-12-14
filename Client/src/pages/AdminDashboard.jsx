import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { quizAPI } from '../utils/apiService';
import Card from '../components/Card';
import Button from '../components/Button';
import { Plus, Trash2, Edit, Trophy, BarChart3 } from 'lucide-react';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
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

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this quiz?")) return;
        try {
            await quizAPI.delete(id);
            setQuizzes(quizzes.filter(q => q._id !== id));
            toast.success("Quiz deleted successfully");
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete quiz");
        }
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-7xl animate-fade-in">
            {/* Header */}
            <div className="mb-12">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-4xl font-extrabold text-gradient-primary mb-2">Admin Dashboard</h1>
                        <p className="text-text-muted text-lg">Manage your quizzes and track performance</p>
                    </div>
                    <Link to="/admin/create-quiz">
                        <Button variant="primary" className="px-6 py-3">
                            <Plus size={20} />
                            Create Quiz
                        </Button>
                    </Link>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="glass-strong p-6 rounded-2xl">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-primary/20 rounded-xl">
                                <BarChart3 className="text-primary" size={24} />
                            </div>
                            <div>
                                <p className="text-text-muted text-sm">Total Quizzes</p>
                                <p className="text-3xl font-bold text-text">{quizzes.length}</p>
                            </div>
                        </div>
                    </div>
                    <div className="glass-strong p-6 rounded-2xl">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-secondary/20 rounded-xl">
                                <Trophy className="text-secondary" size={24} />
                            </div>
                            <div>
                                <p className="text-text-muted text-sm">Total Questions</p>
                                <p className="text-3xl font-bold text-text">
                                    {quizzes.reduce((acc, q) => acc + q.questions.length, 0)}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="glass-strong p-6 rounded-2xl">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-success/20 rounded-xl">
                                <Edit className="text-success" size={24} />
                            </div>
                            <div>
                                <p className="text-text-muted text-sm">Status</p>
                                <p className="text-3xl font-bold text-success">Active</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quizzes Grid */}
            {loading ? (
                <div className="text-center py-20">
                    <div className="inline-block animate-pulse">
                        <div className="w-16 h-16 bg-primary/20 rounded-full mb-4"></div>
                        <p className="text-text-muted">Loading quizzes...</p>
                    </div>
                </div>
            ) : quizzes.length === 0 ? (
                <div className="glass-strong p-12 text-center rounded-3xl">
                    <div className="max-w-md mx-auto">
                        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Plus className="text-primary" size={40} />
                        </div>
                        <h3 className="text-2xl font-bold mb-3">No quizzes yet</h3>
                        <p className="text-text-muted mb-6">Create your first quiz to get started</p>
                        <Link to="/admin/create-quiz">
                            <Button variant="primary">Create Quiz</Button>
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {quizzes.map((quiz) => (
                        <Card key={quiz._id} className="group hover:shadow-glow transition-all duration-300">
                            <div className="flex flex-col h-full">
                                <h3 className="text-xl font-bold mb-3 text-gradient-primary group-hover:scale-105 transition-transform">
                                    {quiz.title}
                                </h3>
                                <p className="text-text-muted mb-4 flex items-center gap-2">
                                    <BarChart3 size={16} />
                                    {quiz.questions.length} Questions
                                </p>

                                <div className="mt-auto space-y-3">
                                    <div className="flex gap-2">
                                        <Link to={`/admin/edit-quiz/${quiz._id}`} className="flex-1">
                                            <Button variant="outline" className="w-full">
                                                <Edit size={16} />
                                                Edit
                                            </Button>
                                        </Link>
                                        <Button
                                            variant="ghost"
                                            onClick={() => handleDelete(quiz._id)}
                                            className="px-4 hover:bg-error/10 hover:text-error"
                                        >
                                            <Trash2 size={16} />
                                        </Button>
                                    </div>
                                    <Link to={`/quiz/${quiz._id}/leaderboard`} className="block">
                                        <Button variant="primary" className="w-full">
                                            <Trophy size={16} />
                                            View Leaderboard
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

export default AdminDashboard;
