import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { quizAPI } from '../utils/apiService';
import Card from '../components/Card';
import Button from '../components/Button';
import { History, Trophy, TrendingUp, Calendar, Award, Star, BarChart3, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

const QuizHistory = () => {
    const [historyData, setHistoryData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        try {
            const data = await quizAPI.getUserHistory();
            setHistoryData(data);
        } catch (error) {
            console.error("Failed to fetch quiz history", error);
            toast.error("Failed to load quiz history");
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getPerformanceBadge = (percentage) => {
        if (percentage >= 90) {
            return { label: 'Excellent', color: 'text-success', bgColor: 'bg-success/10', icon: Award };
        } else if (percentage >= 70) {
            return { label: 'Great', color: 'text-primary', bgColor: 'bg-primary/10', icon: Star };
        } else if (percentage >= 50) {
            return { label: 'Good', color: 'text-secondary', bgColor: 'bg-secondary/10', icon: TrendingUp };
        } else {
            return { label: 'Keep Going', color: 'text-warning', bgColor: 'bg-yellow-500/10', icon: TrendingUp };
        }
    };

    if (loading) {
        return (
            <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 bg-primary/20 rounded-full animate-pulse mb-4 mx-auto"></div>
                    <p className="text-text-muted">Loading your history...</p>
                </div>
            </div>
        );
    }

    if (!historyData) {
        return <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center text-text-muted">Failed to load history</div>;
    }

    const { statistics, history } = historyData;

    return (
        <div className="container mx-auto px-4 py-12 max-w-6xl animate-fade-in">
            {/* Back Button */}
            <div className="mb-8">
                <Link to="/dashboard">
                    <Button variant="ghost">
                        <ArrowLeft size={20} />
                        Back to Dashboard
                    </Button>
                </Link>
            </div>

            {/* Header */}
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full mb-6 shadow-glow-lg">
                    <History className="text-white" size={40} />
                </div>
                <h1 className="text-5xl font-extrabold mb-3">
                    <span className="text-gradient-primary">Quiz History</span>
                </h1>
                <p className="text-text-muted text-lg">Track your progress and performance</p>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <Card className="text-center bg-gradient-to-br from-primary/10 to-primary/5">
                    <div className="flex flex-col items-center">
                        <div className="p-4 bg-primary/20 rounded-full mb-4">
                            <BarChart3 className="text-primary" size={32} />
                        </div>
                        <p className="text-text-muted text-sm mb-2">Total Attempts</p>
                        <p className="text-5xl font-extrabold text-gradient-primary">{statistics.totalAttempts}</p>
                    </div>
                </Card>

                <Card className="text-center bg-gradient-to-br from-secondary/10 to-secondary/5">
                    <div className="flex flex-col items-center">
                        <div className="p-4 bg-secondary/20 rounded-full mb-4">
                            <TrendingUp className="text-secondary" size={32} />
                        </div>
                        <p className="text-text-muted text-sm mb-2">Average Score</p>
                        <p className="text-5xl font-extrabold text-gradient-primary">{statistics.averageScore}%</p>
                    </div>
                </Card>

                <Card className="text-center bg-gradient-to-br from-green-500/10 to-green-500/5">
                    <div className="flex flex-col items-center">
                        <div className="p-4 bg-success/20 rounded-full mb-4">
                            <Trophy className="text-success" size={32} />
                        </div>
                        <p className="text-text-muted text-sm mb-2">Best Score</p>
                        <p className="text-5xl font-extrabold text-success">{statistics.bestScore}%</p>
                    </div>
                </Card>
            </div>

            {/* History List */}
            {history.length === 0 ? (
                <Card className="text-center p-12">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <History className="text-primary" size={40} />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">No quiz attempts yet</h3>
                    <p className="text-text-muted mb-6">Start taking quizzes to build your history!</p>
                    <Link to="/dashboard">
                        <Button variant="primary">Browse Quizzes</Button>
                    </Link>
                </Card>
            ) : (
                <div>
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <Calendar size={24} className="text-primary" />
                        Your Attempts
                    </h2>
                    <div className="space-y-4">
                        {history.map((attempt, index) => {
                            const badge = getPerformanceBadge(attempt.percentage);
                            const BadgeIcon = badge.icon;

                            return (
                                <Card
                                    key={attempt._id}
                                    className="group hover:shadow-glow transition-all duration-300"
                                    style={{ animationDelay: `${index * 0.05}s` }}
                                >
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        {/* Quiz Info */}
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold text-text mb-2 group-hover:text-gradient-primary transition-all">
                                                {attempt.quizTitle}
                                            </h3>
                                            <p className="text-text-muted text-sm flex items-center gap-2">
                                                <Calendar size={14} />
                                                {formatDate(attempt.completedAt)}
                                            </p>
                                        </div>

                                        {/* Score Display */}
                                        <div className="flex items-center gap-6">
                                            {/* Performance Badge */}
                                            <div className={`flex items-center gap-2 px-4 py-2 ${badge.bgColor} rounded-full`}>
                                                <BadgeIcon className={badge.color} size={18} />
                                                <span className={`${badge.color} font-semibold text-sm`}>{badge.label}</span>
                                            </div>

                                            {/* Score */}
                                            <div className="text-right">
                                                <div className="text-3xl font-extrabold text-gradient-primary">
                                                    {attempt.score}<span className="text-lg text-text-muted">/{attempt.totalQuestions}</span>
                                                </div>
                                                <div className="text-text-muted font-semibold">
                                                    {attempt.percentage}%
                                                </div>
                                            </div>

                                            {/* Leaderboard Link */}
                                            {attempt.quizId && (
                                                <Link to={`/quiz/${attempt.quizId}/leaderboard`}>
                                                    <Button variant="outline" className="px-4 py-2">
                                                        <Trophy size={16} />
                                                        Leaderboard
                                                    </Button>
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default QuizHistory;
