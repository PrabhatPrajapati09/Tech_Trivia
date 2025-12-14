import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import { Trophy, Home, BarChart3, Award, Star } from 'lucide-react';

const Result = () => {
    const location = useLocation();
    const { score, total, quizTitle, quizId } = location.state || { score: 0, total: 0, quizTitle: 'Quiz', quizId: null };

    const percentage = Math.round((score / total) * 100) || 0;
    let message = '';
    let emoji = '';
    let colorClass = '';

    if (percentage >= 90) {
        message = 'Outstanding Performance!';
        emoji = '🎉';
        colorClass = 'text-success';
    } else if (percentage >= 70) {
        message = 'Great Job!';
        emoji = '🌟';
        colorClass = 'text-primary';
    } else if (percentage >= 50) {
        message = 'Good Effort!';
        emoji = '👍';
        colorClass = 'text-secondary';
    } else {
        message = 'Keep Practicing!';
        emoji = '💪';
        colorClass = 'text-warning';
    }

    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
            <Card className="w-full max-w-2xl text-center animate-scale-in">
                {/* Trophy Icon */}
                <div className="relative mb-8">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 blur-3xl"></div>
                    <div className="relative inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-primary to-secondary rounded-full shadow-glow-lg">
                        <Trophy className="text-white" size={64} />
                    </div>
                </div>

                {/* Message */}
                <h2 className="text-4xl font-extrabold mb-2">
                    {message} {emoji}
                </h2>
                <p className="text-text-muted text-lg mb-8">
                    You completed <span className="text-primary font-semibold">{quizTitle}</span>
                </p>

                {/* Score Display */}
                <div className="glass-strong p-8 rounded-3xl mb-8">
                    <div className={`text-7xl font-extrabold mb-4 ${colorClass}`}>
                        {score}
                        <span className="text-3xl text-text-muted">/{total}</span>
                    </div>
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="h-2 w-full max-w-xs bg-surface-light rounded-full overflow-hidden">
                            <div
                                className={`h-full bg-gradient-to-r from-primary to-secondary transition-all duration-1000`}
                                style={{ width: `${percentage}%` }}
                            ></div>
                        </div>
                        <span className={`text-2xl font-bold ${colorClass}`}>{percentage}%</span>
                    </div>

                    {/* Performance Badges */}
                    <div className="flex items-center justify-center gap-4 mt-6">
                        {percentage >= 90 && (
                            <div className="flex items-center gap-2 px-4 py-2 bg-success/10 rounded-full">
                                <Award className="text-success" size={20} />
                                <span className="text-success font-semibold">Perfect!</span>
                            </div>
                        )}
                        {percentage >= 70 && (
                            <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
                                <Star className="text-primary" size={20} />
                                <span className="text-primary font-semibold">Excellent</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center justify-center gap-4">
                    <Link to="/dashboard">
                        <Button variant="outline" className="px-6 py-3">
                            <Home size={20} />
                            Dashboard
                        </Button>
                    </Link>
                    {quizId && (
                        <Link to={`/quiz/${quizId}/leaderboard`}>
                            <Button variant="primary" className="px-6 py-3">
                                <BarChart3 size={20} />
                                View Leaderboard
                            </Button>
                        </Link>
                    )}
                </div>
            </Card>
        </div>
    );
};

export default Result;
